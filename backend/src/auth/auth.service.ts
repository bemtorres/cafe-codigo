import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    this.googleClient = new OAuth2Client(clientId);
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });
    if (existing) {
      throw new ConflictException('Ya existe una cuenta con este correo electrónico');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase().trim(),
        name: dto.name.trim(),
        passwordHash,
        role: 'STUDENT',
        levelCode: 'americano',
        coffeeCoins: 10, // 10 CoffeeCoins de regalo de bienvenida
        points: 0,
      },
    });

    // Generar token de verificación de correo
    const verificationToken = randomBytes(32).toString('hex');
    await this.prisma.emailVerificationToken.create({
      data: {
        token: verificationToken,
        email: user.email,
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      },
    });

    // Enviar correos en segundo plano
    this.mailService.sendWelcomeEmail(user.email, user.name).catch(() => {});
    this.mailService
      .sendVerificationEmail(user.email, user.name, verificationToken)
      .catch(() => {});

    const accessToken = this.generateToken(user);

    return {
      message: 'Usuario registrado exitosamente',
      user: this.sanitizeUser(user),
      accessToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const accessToken = this.generateToken(user);

    return {
      message: 'Inicio de sesión exitoso',
      user: this.sanitizeUser(user),
      accessToken,
    };
  }

  async validateOrCreateGoogleUser(googleProfile: {
    googleId: string;
    email: string;
    name: string;
    avatarUrl?: string;
  }) {
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { googleId: googleProfile.googleId },
          { email: googleProfile.email.toLowerCase().trim() },
        ],
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleProfile.email.toLowerCase().trim(),
          name: googleProfile.name || 'Estudiante',
          googleId: googleProfile.googleId,
          avatarUrl: googleProfile.avatarUrl,
          isEmailVerified: true,
          role: 'STUDENT',
          coffeeCoins: 15,
        },
      });

      this.mailService.sendWelcomeEmail(user.email, user.name).catch(() => {});
    } else if (!user.googleId) {
      // Si el usuario ya existía con email y se vincula con Google
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: googleProfile.googleId,
          isEmailVerified: true,
          avatarUrl: user.avatarUrl || googleProfile.avatarUrl,
        },
      });
    }

    const accessToken = this.generateToken(user);
    return {
      user: this.sanitizeUser(user),
      accessToken,
    };
  }

  async loginWithGoogleToken(idToken: string) {
    try {
      const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: clientId,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new UnauthorizedException('Token de Google inválido');
      }

      return this.validateOrCreateGoogleUser({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name || payload.given_name || 'Estudiante',
        avatarUrl: payload.picture,
      });
    } catch (error) {
      throw new UnauthorizedException('No se pudo verificar el token de Google: ' + error.message);
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    // Por seguridad, siempre respondemos con éxito incluso si no existe
    if (!user) {
      return { message: 'Si el correo está registrado, recibirás un enlace de recuperación.' };
    }

    // Invalidar tokens previos
    await this.prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    const resetToken = randomBytes(32).toString('hex');
    await this.prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
      },
    });

    await this.mailService.sendPasswordResetEmail(user.email, user.name, resetToken);

    return { message: 'Si el correo está registrado, recibirás un enlace de recuperación.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenRecord = await this.prisma.passwordResetToken.findUnique({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new BadRequestException('El token es inválido o ha expirado');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.newPassword, salt);

    await this.prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { passwordHash },
    });

    await this.prisma.passwordResetToken.delete({
      where: { id: tokenRecord.id },
    });

    return { message: 'Contraseña actualizada exitosamente' };
  }

  async verifyEmail(token: string) {
    const tokenRecord = await this.prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new BadRequestException('El token de confirmación es inválido o ha expirado');
    }

    await this.prisma.user.update({
      where: { email: tokenRecord.email },
      data: { isEmailVerified: true },
    });

    await this.prisma.emailVerificationToken.delete({
      where: { id: tokenRecord.id },
    });

    return { message: 'Correo verificado exitosamente' };
  }

  generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: any) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

