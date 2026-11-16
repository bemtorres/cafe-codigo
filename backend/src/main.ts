import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('CafeyCodigoBackend');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Prefijo global para todos los endpoints
  app.setGlobalPrefix('api');

  // Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de CORS para comunicarse con el frontend de Astro
  const frontendUrl = configService.get<string>('FRONTEND_URL', 'http://localhost:4321');
  app.enableCors({
    origin: [frontendUrl, 'http://localhost:4321', 'http://127.0.0.1:4321'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuración de Swagger / OpenAPI
  const swaggerConfig = new DocumentBuilder()
    .setTitle('☕ Café y Código — API Backend')
    .setDescription(
      'Documentación de la API Backend en NestJS y PostgreSQL para la plataforma de aprendizaje Café y Código (/app).',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

  logger.log(` Servidor backend de Café y Código iniciado en: http://localhost:${port}/api`);
  logger.log(` Documentación interactiva de Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();

