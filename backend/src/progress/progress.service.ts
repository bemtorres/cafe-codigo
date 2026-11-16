import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompleteContentDto, SubmitQuizDto } from './dto/progress.dto';
import { UserLevelCode } from '@prisma/client';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateLevel(points: number): UserLevelCode {
    if (points >= 2500) return 'ristretto';
    if (points >= 1000) return 'espresso';
    if (points >= 500) return 'macchiato';
    if (points >= 100) return 'latte';
    return 'americano';
  }

  async getCourseProgress(userId: string, courseIdSlug: string) {
    const course = await this.prisma.course.findUnique({
      where: { courseId: courseIdSlug },
    });

    if (!course) {
      throw new NotFoundException(`El curso ${courseIdSlug} no existe`);
    }

    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    return (
      enrollment || {
        userId,
        courseId: course.id,
        completedContentIds: [],
        score: 0,
        isCompleted: false,
      }
    );
  }

  async completeContent(userId: string, courseIdSlug: string, dto: CompleteContentDto) {
    const course = await this.prisma.course.findUnique({
      where: { courseId: courseIdSlug },
    });

    if (!course) {
      throw new NotFoundException(`El curso ${courseIdSlug} no existe`);
    }

    let enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    const isNewCompletion = !enrollment?.completedContentIds.includes(dto.contenidoId);

    if (!enrollment) {
      enrollment = await this.prisma.enrollment.create({
        data: {
          userId,
          courseId: course.id,
          completedContentIds: [dto.contenidoId],
          lastLessionId: dto.lessionId,
          lastSeccionId: dto.seccionId,
          lastContenidoId: dto.contenidoId,
        },
      });
    } else if (isNewCompletion) {
      enrollment = await this.prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          completedContentIds: {
            push: dto.contenidoId,
          },
          lastLessionId: dto.lessionId,
          lastSeccionId: dto.seccionId,
          lastContenidoId: dto.contenidoId,
        },
      });
    }

    // Si es la primera vez que completa este contenido, le otorgamos 2 CoffeeCoins y 5 Puntos
    let coinsEarned = 0;
    let pointsEarned = 0;
    if (isNewCompletion) {
      coinsEarned = 2;
      pointsEarned = 5;

      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        const newPoints = user.points + pointsEarned;
        const newLevel = this.calculateLevel(newPoints);

        await this.prisma.user.update({
          where: { id: userId },
          data: {
            coffeeCoins: user.coffeeCoins + coinsEarned,
            points: newPoints,
            levelCode: newLevel,
          },
        });
      }
    }

    return {
      success: true,
      completedContentIds: enrollment.completedContentIds,
      coinsEarned,
      pointsEarned,
    };
  }

  async submitQuiz(userId: string, courseIdSlug: string, dto: SubmitQuizDto) {
    const course = await this.prisma.course.findUnique({
      where: { courseId: courseIdSlug },
    });

    if (!course) {
      throw new NotFoundException(`El curso ${courseIdSlug} no existe`);
    }

    const attempt = await this.prisma.quizAttempt.create({
      data: {
        userId,
        courseId: course.id,
        widgetId: dto.widgetId,
        score: dto.score,
        maxScore: dto.maxScore,
        isPassed: dto.isPassed,
        details: dto.details || {},
      },
    });

    // Otorgar CoffeeCoins y Puntos en base a su desempeño
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    let coinsEarned = 0;
    let pointsEarned = 0;

    if (user && dto.isPassed) {
      coinsEarned = Math.max(1, Math.round(dto.score / 2));
      pointsEarned = dto.score * 10;

      const newPoints = user.points + pointsEarned;
      const newLevel = this.calculateLevel(newPoints);

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          coffeeCoins: user.coffeeCoins + coinsEarned,
          points: newPoints,
          levelCode: newLevel,
        },
      });
    }

    return {
      attemptId: attempt.id,
      score: dto.score,
      isPassed: dto.isPassed,
      coinsEarned,
      pointsEarned,
    };
  }

  async getLeaderboard(limit = 10) {
    return this.prisma.user.findMany({
      take: limit,
      orderBy: [{ points: 'desc' }, { coffeeCoins: 'desc' }],
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        points: true,
        coffeeCoins: true,
        levelCode: true,
      },
    });
  }
}

