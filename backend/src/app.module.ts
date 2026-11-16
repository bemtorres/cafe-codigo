import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ProgressModule } from './progress/progress.module';
import { AdminModule } from './admin/admin.module';
import { TeachersModule } from './teachers/teachers.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    MailModule,
    AuthModule,
    CoursesModule,
    ProgressModule,
    AdminModule,
    TeachersModule,
    SectionsModule,
  ],
})
export class AppModule {}

