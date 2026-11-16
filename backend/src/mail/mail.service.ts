import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter;
  private readonly fromAddress: string;
  private readonly frontendUrl: string;

  constructor(private readonly config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST');
    const port = this.config.get<number>('SMTP_PORT', 587);
    const secure = this.config.get<string>('SMTP_SECURE') === 'true';
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    this.fromAddress = this.config.get<string>('SMTP_FROM', '"Café y Código" <no-reply@cafeycodigo.org>');
    this.frontendUrl = this.config.get<string>('FRONTEND_URL', 'http://localhost:4321');

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });

    this.verifyConnection();
  }

  private async verifyConnection() {
    try {
      if (this.config.get<string>('SMTP_USER') !== 'tu-usuario-smtp@tudominio.com') {
        await this.transporter.verify();
        this.logger.log(' Conexión con el servidor SMTP establecida exitosamente.');
      } else {
        this.logger.warn(' Servidor SMTP pendiente de configurar (credenciales de ejemplo en .env).');
      }
    } catch (error) {
      this.logger.warn(` No se pudo verificar el servidor SMTP: ${error.message}`);
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: this.fromAddress,
        to,
        subject,
        html,
      });
      this.logger.log(` Correo enviado a ${to}: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error(` Error enviando correo a ${to}: ${error.message}`);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, name: string) {
    const subject = '☕ ¡Bienvenido a Café y Código!';
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 3px solid #18181B; border-radius: 12px; overflow: hidden; box-shadow: 6px 6px 0px #18181B;">
        <div style="background: #F59E0B; padding: 24px; text-align: center; border-bottom: 3px solid #18181B;">
          <h1 style="margin: 0; font-size: 26px; color: #18181B; font-weight: 900;">☕ Café y Código</h1>
        </div>
        <div style="padding: 30px; color: #27272A; line-height: 1.6;">
          <h2 style="font-size: 22px; color: #18181B; margin-top: 0;">¡Hola, ${name}!</h2>
          <p>Tu cuenta ha sido creada con éxito. Ya eres parte de nuestra comunidad de aprendizaje interactivo.</p>
          <p>Tu nivel inicial es <strong>☕ Americano (0 pts)</strong>. Completa lecciones, resuelve desafíos y gana <strong>CoffeeCoins</strong> para desbloquear nuevos niveles y medallas.</p>
          <div style="text-align: center; margin: 35px 0;">
            <a href="${this.frontendUrl}/app" style="background: #10B981; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border: 2px solid #18181B; border-radius: 8px; box-shadow: 4px 4px 0px #18181B; display: inline-block;">
              Ir al Aula de Aprendizaje 🚀
            </a>
          </div>
          <p style="font-size: 14px; color: #71717A;">Si no reconoces este registro, puedes ignorar este mensaje con total seguridad.</p>
        </div>
        <div style="background: #FAFAFA; padding: 16px; text-align: center; font-size: 12px; color: #A1A1AA; border-top: 2px solid #E4E4E7;">
          Café y Código — Plataforma Libre y Gratuita de Aprendizaje
        </div>
      </div>
    `;
    return this.sendMail(to, subject, html);
  }

  async sendVerificationEmail(to: string, name: string, token: string) {
    const verifyUrl = `${this.frontendUrl}/auth/verify-email?token=${token}`;
    const subject = '🔐 Confirma tu correo en Café y Código';
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 3px solid #18181B; border-radius: 12px; overflow: hidden; box-shadow: 6px 6px 0px #18181B;">
        <div style="background: #F59E0B; padding: 24px; text-align: center; border-bottom: 3px solid #18181B;">
          <h1 style="margin: 0; font-size: 26px; color: #18181B; font-weight: 900;">☕ Café y Código</h1>
        </div>
        <div style="padding: 30px; color: #27272A; line-height: 1.6;">
          <h2 style="font-size: 20px; color: #18181B; margin-top: 0;">Verifica tu correo electrónico</h2>
          <p>Hola <strong>${name}</strong>, por favor pulsa el siguiente botón para confirmar tu dirección de correo electrónico:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background: #3B82F6; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border: 2px solid #18181B; border-radius: 8px; box-shadow: 4px 4px 0px #18181B; display: inline-block;">
              Confirmar mi Cuenta
            </a>
          </div>
          <p style="font-size: 13px; color: #71717A;">O copia y pega este enlace en tu navegador:<br><a href="${verifyUrl}">${verifyUrl}</a></p>
        </div>
      </div>
    `;
    return this.sendMail(to, subject, html);
  }

  async sendPasswordResetEmail(to: string, name: string, token: string) {
    const resetUrl = `${this.frontendUrl}/auth/reset-password?token=${token}`;
    const subject = '🔑 Restablecer contraseña — Café y Código';
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 3px solid #18181B; border-radius: 12px; overflow: hidden; box-shadow: 6px 6px 0px #18181B;">
        <div style="background: #EF4444; padding: 24px; text-align: center; border-bottom: 3px solid #18181B;">
          <h1 style="margin: 0; font-size: 26px; color: #FFFFFF; font-weight: 900;">☕ Restablecer Contraseña</h1>
        </div>
        <div style="padding: 30px; color: #27272A; line-height: 1.6;">
          <p>Hola <strong>${name}</strong>,</p>
          <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Café y Código.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #EF4444; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border: 2px solid #18181B; border-radius: 8px; box-shadow: 4px 4px 0px #18181B; display: inline-block;">
              Cambiar Contraseña
            </a>
          </div>
          <p style="font-size: 13px; color: #71717A;">Este enlace expirará en 1 hora. Si tú no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
      </div>
    `;
    return this.sendMail(to, subject, html);
  }

  async sendTeacherStudentWelcomeEmail(
    to: string,
    studentName: string,
    teacherName: string,
    courseTitle: string,
    tempPassword?: string,
  ) {
    const loginUrl = `${this.frontendUrl}/app`;
    const subject = `🎓 Tu profesor ${teacherName} te ha inscrito en ${courseTitle}`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 3px solid #18181B; border-radius: 12px; overflow: hidden; box-shadow: 6px 6px 0px #18181B;">
        <div style="background: #3B82F6; padding: 24px; text-align: center; border-bottom: 3px solid #18181B;">
          <h1 style="margin: 0; font-size: 26px; color: #FFFFFF; font-weight: 900;">🎓 Invitación a Clase</h1>
        </div>
        <div style="padding: 30px; color: #27272A; line-height: 1.6;">
          <h2 style="font-size: 20px; color: #18181B; margin-top: 0;">¡Hola, ${studentName}!</h2>
          <p>Tu profesor(a) <strong>${teacherName}</strong> te ha registrado en la plataforma <strong>Café y Código</strong> para cursar la asignatura:</p>
          <div style="background: #F4F4F5; border: 2px solid #18181B; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 16px; font-weight: bold; text-align: center;">
            📚 ${courseTitle}
          </div>
          ${
            tempPassword
              ? `
            <div style="background: #FEF3C7; border: 2px dashed #D97706; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 6px 0; font-weight: bold; color: #92400E;">Tus credenciales de acceso iniciales:</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Usuario:</strong> ${to}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Contraseña temporal:</strong> <code style="background: #FFFFFF; padding: 2px 6px; border: 1px solid #18181B; border-radius: 4px; font-weight: bold;">${tempPassword}</code></p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #B45309;">(Puedes cambiar tu contraseña una vez ingreses a tu perfil).</p>
            </div>
            `
              : `<p>Puedes iniciar sesión con tu cuenta habitual de Café y Código o con Google.</p>`
          }
          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" style="background: #10B981; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border: 2px solid #18181B; border-radius: 8px; box-shadow: 4px 4px 0px #18181B; display: inline-block;">
              Entrar al Aula Virtual 🚀
            </a>
          </div>
          <p style="font-size: 13px; color: #71717A;">Tu docente podrá ver tu avance, lecciones completadas y puntuaciones de los retos.</p>
        </div>
      </div>
    `;
    return this.sendMail(to, subject, html);
  }

  async sendSectionApprovalNotification(
    to: string,
    studentName: string,
    sectionName: string,
    teacherName: string,
  ) {
    const campusUrl = `${this.frontendUrl}/app/secciones/`;
    const subject = `🎉 ¡Solicitud Aprobada! Bienvenido a ${sectionName}`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 3px solid #18181B; border-radius: 12px; overflow: hidden; box-shadow: 6px 6px 0px #18181B;">
        <div style="background: #10B981; padding: 24px; text-align: center; border-bottom: 3px solid #18181B;">
          <h1 style="margin: 0; font-size: 26px; color: #FFFFFF; font-weight: 900;">🎉 ¡Solicitud Aprobada!</h1>
        </div>
        <div style="padding: 30px; color: #27272A; line-height: 1.6;">
          <h2 style="font-size: 20px; color: #18181B; margin-top: 0;">¡Buenas noticias, ${studentName}!</h2>
          <p>Tu profesor(a) <strong>${teacherName}</strong> ha aceptado tu solicitud de ingreso a la sección:</p>
          <div style="background: #ECFDF5; border: 2px solid #059669; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 16px; font-weight: bold; text-align: center; color: #065F46;">
            🏫 ${sectionName}
          </div>
          <p>Ya tienes acceso completo a:</p>
          <ul style="font-size: 14px; color: #374151;">
            <li>📚 Todos los cursos vinculados a la sección.</li>
            <li>👥 Tu grupo de trabajo asignado.</li>
            <li>💬 Foros de debate e intercambio con tus compañeros.</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${campusUrl}" style="background: #10B981; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border: 2px solid #18181B; border-radius: 8px; box-shadow: 4px 4px 0px #18181B; display: inline-block;">
              Ir a mi Sección en el Campus 🚀
            </a>
          </div>
        </div>
      </div>
    `;
    return this.sendMail(to, subject, html);
  }

  async sendLeaderAssignedNotification(
    to: string,
    studentName: string,
    groupName: string,
    sectionName: string,
  ) {
    const campusUrl = `${this.frontendUrl}/app/secciones/`;
    const subject = `👑 Has sido nombrado Representante en ${groupName}`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 3px solid #18181B; border-radius: 12px; overflow: hidden; box-shadow: 6px 6px 0px #18181B;">
        <div style="background: #F59E0B; padding: 24px; text-align: center; border-bottom: 3px solid #18181B;">
          <h1 style="margin: 0; font-size: 26px; color: #18181B; font-weight: 900;">👑 ¡Liderazgo de Equipo!</h1>
        </div>
        <div style="padding: 30px; color: #27272A; line-height: 1.6;">
          <h2 style="font-size: 20px; color: #18181B; margin-top: 0;">¡Felicitaciones, ${studentName}!</h2>
          <p>Tu docente te ha nombrado oficialmente <strong>Representante y Líder</strong> del equipo:</p>
          <div style="background: #FEF3C7; border: 2px solid #D97706; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 16px; font-weight: bold; text-align: center; color: #92400E;">
            👥 ${groupName} · (${sectionName})
          </div>
          <p>Como representante, serás el punto de enlace entre tu equipo y el docente para coordinar entregas y debates en el foro.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${campusUrl}" style="background: #F59E0B; color: #18181B; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 16px; border: 2px solid #18181B; border-radius: 8px; box-shadow: 4px 4px 0px #18181B; display: inline-block;">
              Ver a mi Equipo 👥
            </a>
          </div>
        </div>
      </div>
    `;
    return this.sendMail(to, subject, html);
  }
}

