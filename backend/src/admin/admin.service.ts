import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      countStudents,
      countTeachers,
      countEditors,
      countAdmins,
      totalCourses,
      publishedCourses,
      draftCourses,
      totalEnrollments,
      totalAttempts,
      coinsAgg,
      recentUsers,
      recentCourses,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'TEACHER' } }),
      this.prisma.user.count({ where: { role: 'EDITOR' } }),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.course.count(),
      this.prisma.course.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.course.count({ where: { status: 'DRAFT' } }),
      this.prisma.enrollment.count(),
      this.prisma.quizAttempt.count(),
      this.prisma.user.aggregate({ _sum: { coffeeCoins: true, points: true } }),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          levelCode: true,
          createdAt: true,
        },
      }),
      this.prisma.course.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          courseId: true,
          title: true,
          status: true,
          version: true,
          updatedAt: true,
          author: { select: { name: true } },
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        students: countStudents,
        teachers: countTeachers,
        editors: countEditors,
        admins: countAdmins,
      },
      courses: {
        total: totalCourses,
        published: publishedCourses,
        draft: draftCourses,
      },
      gamification: {
        totalCoffeeCoins: coinsAgg._sum.coffeeCoins || 0,
        totalPoints: coinsAgg._sum.points || 0,
        totalQuizAttempts: totalAttempts,
        totalEnrollments,
      },
      recentUsers,
      recentCourses,
    };
  }

  async getUsers(page = 1, limit = 20, role?: Role, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          role: true,
          levelCode: true,
          coffeeCoins: true,
          points: true,
          isEmailVerified: true,
          googleId: true,
          createdAt: true,
          _count: {
            select: {
              enrollments: true,
              coursesCreated: true,
              quizAttempts: true,
            },
          },
        },
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      users: users.map((u) => ({
        ...u,
        hasGoogleLinked: Boolean(u.googleId),
      })),
    };
  }

  async updateUserRole(userId: string, newRole: Role) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: `El rol de ${updated.name} fue actualizado a ${updated.role}`,
      user: updated,
    };
  }

  async adjustUserCoins(userId: string, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const newCoins = Math.max(0, user.coffeeCoins + amount);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { coffeeCoins: newCoins },
      select: {
        id: true,
        name: true,
        email: true,
        coffeeCoins: true,
      },
    });

    return {
      message: `Balance de CoffeeCoins actualizado a ${updated.coffeeCoins}`,
      user: updated,
    };
  }

  async getAdminCourses() {
    return this.prisma.course.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        courseId: true,
        title: true,
        version: true,
        category: true,
        status: true,
        institution: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            revisions: true,
            quizAttempts: true,
          },
        },
      },
    });
  }

  async getRecentActivities() {
    const [recentUsers, recentAttempts, recentRevisions] = await Promise.all([
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      this.prisma.quizAttempt.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          score: true,
          maxScore: true,
          isPassed: true,
          createdAt: true,
          user: { select: { name: true, email: true } },
          course: { select: { title: true, courseId: true } },
        },
      }),
      this.prisma.courseRevision.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          author: { select: { name: true } },
          course: { select: { title: true, courseId: true } },
        },
      }),
    ]);

    const activities = [
      ...recentUsers.map((u) => ({
        type: 'USER_REGISTERED',
        description: `Nuevo usuario registrado: ${u.name} (${u.role})`,
        timestamp: u.createdAt,
      })),
      ...recentAttempts.map((a) => ({
        type: 'QUIZ_ATTEMPT',
        description: `${a.user.name} completó reto en "${a.course.title}" (${a.score}/${a.maxScore} pts)`,
        timestamp: a.createdAt,
      })),
      ...recentRevisions.map((r) => ({
        type: 'COURSE_REVISION',
        description: `${r.author?.name || 'Editor'} actualizó el curso "${r.course.title}"`,
        timestamp: r.createdAt,
      })),
    ];

    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return activities.slice(0, 10);
  }
}

