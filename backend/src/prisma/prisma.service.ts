import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService?: ConfigService) {
    const user = configService?.get<string>('DB_USER') || process.env.DB_USER || 'postgres';
    const password = configService?.get<string>('DB_PASSWORD') || process.env.DB_PASSWORD || 'postgres';
    const host = configService?.get<string>('DB_HOST') || process.env.DB_HOST || 'localhost';
    const port = configService?.get<string>('DB_PORT') || process.env.DB_PORT || '5432';
    const database = configService?.get<string>('DB_NAME') || process.env.DB_NAME || 'cafeycodigo';
    const schema = configService?.get<string>('DB_SCHEMA') || process.env.DB_SCHEMA || 'public';

    // Si DATABASE_URL está definida la usa directamente; de lo contrario la arma con las variables separadas
    const computedUrl =
      configService?.get<string>('DATABASE_URL') ||
      process.env.DATABASE_URL ||
      `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}?schema=${schema}`;

    super({
      datasources: {
        db: {
          url: computedUrl,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
