import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleTokenDto } from './dto/google-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Autenticación (Auth)')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo estudiante con Email y Contraseña' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión con Email y Contraseña' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('google/token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión o registrarse con ID Token de Google (Google One Tap / GIS)' })
  async googleTokenLogin(@Body() dto: GoogleTokenDto) {
    return this.authService.loginWithGoogleToken(dto.idToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Iniciar flujo OAuth2 con Google (Redirección)' })
  async googleAuth() {
    // Redirige automáticamente a Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback de Google OAuth2' })
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.validateOrCreateGoogleUser(req.user);
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:4321');
    // Redirige al frontend con el token de acceso
    return res.redirect(`${frontendUrl}/auth/callback?token=${result.accessToken}`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener datos del usuario actualmente autenticado' })
  async getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar recuperación de contraseña por correo' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restablecer contraseña con el token recibido por correo' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verificar dirección de correo electrónico con token' })
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}

