import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateClassroomDto, RegisterStudentDto } from './dto/teachers.dto';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private extractTotalWidgetsCount(document: any): number {
    if (!document || !Array.isArray(document.modulos)) return 0;
    let count = 0;
    for (const mod of document.modulos) {
      if (Array.isArray(mod.lessions)) {
        for (const lession of mod.lessions) {
          if (Array.isArray(lession.secciones)) {
            for (const sec of lession.secciones) {
              if (Array.isArray(sec.contenidos)) {
                count += sec.contenidos.length;
              }
            }
          }
        }
      }
    }
    return Math.max(count, 1);
  }

  async getTeacherDashboard(teacherId: string) {
    const classrooms = await this.prisma.classroom.findMany({
      where: { teacherId },
      include: {
        course: { select: { id: true, courseId: true, title: true } },
        _count: { select: { enrollments: true } },
      },
    });

    const classroomIds = classrooms.map((c) => c.id);

    // Obtener todas las matrículas del docente
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        OR: [{ registeredById: teacherId }, { classroomId: { in: classroomIds } }],
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, levelCode: true, coffeeCoins: true },
        },
        course: { select: { id: true, courseId: true, title: true, document: true } },
      },
    });

    // Calcular promedio de avance
    let totalProgressSum = 0;
    const studentIds = new Set<string>();

    const studentsProgress = enrollments.map((enr) => {
      studentIds.add(enr.userId);
      const totalWidgets = this.extractTotalWidgetsCount(enr.course.document);
      const progressPercent = Math.min(
        100,
        Math.round((enr.completedContentIds.length / totalWidgets) * 100),
      );
      totalProgressSum += progressPercent;

      return {
        enrollmentId: enr.id,
        student: enr.user,
        course: {
          courseId: enr.course.courseId,
          title: enr.course.title,
        },
        progressPercent,
        isCompleted: enr.isCompleted,
        lastActivity: enr.updatedAt,
      };
    });

    const averageProgress =
      enrollments.length > 0 ? Math.round(totalProgressSum / enrollments.length) : 0;

    // Intentos de cuestionarios recientes de sus alumnos
    const recentQuizAttempts = await this.prisma.quizAttempt.findMany({
      where: {
        userId: { in: Array.from(studentIds) },
      },
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    });

    return {
      stats: {
        totalClassrooms: classrooms.length,
        totalStudentsEnrolled: studentIds.size,
        totalEnrollments: enrollments.length,
        averageClassProgress: averageProgress,
      },
      classrooms,
      studentsProgress: studentsProgress.slice(0, 10),
      recentQuizAttempts,
    };
  }

  async createClassroom(teacherId: string, dto: CreateClassroomDto) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ courseId: dto.courseId }, { id: dto.courseId }],
      },
    });

    if (!course) {
      throw new NotFoundException(`El curso ${dto.courseId} no fue encontrado`);
    }

    const existingCode = await this.prisma.classroom.findUnique({
      where: { code: dto.code.trim().toUpperCase() },
    });

    if (existingCode) {
      throw new ConflictException(
        `Ya existe un aula o comisión con el código "${dto.code.toUpperCase()}"`,
      );
    }

    const classroom = await this.prisma.classroom.create({
      data: {
        name: dto.name.trim(),
        code: dto.code.trim().toUpperCase(),
        description: dto.description?.trim(),
        teacherId,
        courseId: course.id,
      },
      include: {
        course: { select: { courseId: true, title: true } },
      },
    });

    return {
      message: 'Comisión/Aula creada exitosamente',
      classroom,
    };
  }

  async getClassrooms(teacherId: string) {
    return this.prisma.classroom.findMany({
      where: { teacherId },
      include: {
        course: { select: { id: true, courseId: true, title: true, version: true } },
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async registerStudent(teacherId: string, dto: RegisterStudentDto) {
    const teacher = await this.prisma.user.findUnique({ where: { id: teacherId } });
    if (!teacher) {
      throw new NotFoundException('Docente no encontrado');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ courseId: dto.courseId }, { id: dto.courseId }],
      },
    });

    if (!course) {
      throw new NotFoundException(`El curso ${dto.courseId} no existe`);
    }

    let classroom = null;
    if (dto.classroomId) {
      classroom = await this.prisma.classroom.findFirst({
        where: { id: dto.classroomId, teacherId },
      });
      if (!classroom) {
        throw new NotFoundException('El aula especificada no existe o no te pertenece');
      }
    }

    const email = dto.email.toLowerCase().trim();
    let student = await this.prisma.user.findUnique({ where: { email } });
    let tempPassword: string | undefined = undefined;

    if (!student) {
      tempPassword = `Cafe${randomBytes(3).toString('hex')}!`;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(tempPassword, salt);

      student = await this.prisma.user.create({
        data: {
          email,
          name: dto.name.trim(),
          passwordHash,
          role: 'STUDENT',
          levelCode: 'americano',
          coffeeCoins: 10,
          isEmailVerified: true,
        },
      });
    }

    // Matricular al estudiante en el curso
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: student.id,
          courseId: course.id,
        },
      },
    });

    let enrollment;
    if (existingEnrollment) {
      enrollment = await this.prisma.enrollment.update({
        where: { id: existingEnrollment.id },
        data: {
          classroomId: classroom ? classroom.id : existingEnrollment.classroomId,
          registeredById: teacherId,
        },
      });
    } else {
      enrollment = await this.prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: course.id,
          classroomId: classroom ? classroom.id : null,
          registeredById: teacherId,
        },
      });
    }

    // Enviar correo de notificación al estudiante mediante SMTP
    this.mailService
      .sendTeacherStudentWelcomeEmail(
        student.email,
        student.name,
        teacher.name,
        course.title,
        tempPassword,
      )
      .catch(() => {});

    return {
      message: `Estudiante ${student.name} matriculado correctamente en "${course.title}"`,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: student.role,
        isNewUser: Boolean(tempPassword),
      },
      enrollmentId: enrollment.id,
      classroomCode: classroom?.code,
    };
  }

  async getClassroomStudentsProgress(teacherId: string, classroomId: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: classroomId },
      include: {
        course: true,
        teacher: { select: { id: true, name: true } },
      },
    });

    if (!classroom) {
      throw new NotFoundException('Aula no encontrada');
    }

    if (classroom.teacherId !== teacherId) {
      const teacher = await this.prisma.user.findUnique({ where: { id: teacherId } });
      if (teacher?.role !== 'ADMIN') {
        throw new ForbiddenException('No tienes acceso a esta comisión');
      }
    }

    const totalWidgets = this.extractTotalWidgetsCount(classroom.course.document);

    const enrollments = await this.prisma.enrollment.findMany({
      where: { classroomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            levelCode: true,
            coffeeCoins: true,
            points: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const studentIds = enrollments.map((e) => e.userId);

    // Obtener intentos de quizzes de estos estudiantes en este curso
    const attempts = await this.prisma.quizAttempt.findMany({
      where: {
        courseId: classroom.courseId,
        userId: { in: studentIds },
      },
      orderBy: { createdAt: 'desc' },
    });

    const attemptsByStudent = new Map<string, any[]>();
    for (const att of attempts) {
      const list = attemptsByStudent.get(att.userId) || [];
      list.push(att);
      attemptsByStudent.set(att.userId, list);
    }

    const students = enrollments.map((enr) => {
      const completedCount = enr.completedContentIds.length;
      const progressPercent = Math.min(100, Math.round((completedCount / totalWidgets) * 100));
      const studentAttempts = attemptsByStudent.get(enr.userId) || [];

      return {
        id: enr.user.id,
        name: enr.user.name,
        email: enr.user.email,
        levelCode: enr.user.levelCode,
        coffeeCoins: enr.user.coffeeCoins,
        points: enr.user.points,
        progressPercent,
        completedItemsCount: completedCount,
        totalItemsCount: totalWidgets,
        lastLessionId: enr.lastLessionId,
        lastSeccionId: enr.lastSeccionId,
        lastContenidoId: enr.lastContenidoId,
        isCompleted: enr.isCompleted,
        lastActivity: enr.updatedAt,
        quizzesTakenCount: studentAttempts.length,
        quizzesPassedCount: studentAttempts.filter((a) => a.isPassed).length,
      };
    });

    return {
      classroom: {
        id: classroom.id,
        name: classroom.name,
        code: classroom.code,
        courseTitle: classroom.course.title,
        totalCourseItems: totalWidgets,
      },
      studentsCount: students.length,
      students,
    };
  }
}

