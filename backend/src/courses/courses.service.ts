import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveCourseDto, UpdateCourseStatusDto } from './dto/courses.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async saveCourse(dto: SaveCourseDto, authorId?: string) {
    const document = dto.document;
    const courseId = document?.courseId;

    if (!courseId || typeof courseId !== 'string') {
      throw new BadRequestException('El campo courseId es obligatorio en el documento');
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(courseId)) {
      throw new BadRequestException(
        'El identificador del curso (courseId) solo puede contener letras minúsculas, números y guiones',
      );
    }

    const title = document.title || 'Curso sin título';
    const version = document.version || '1.0.0';
    const category = document.category || null;
    const institution = document.institution || 'Café y Código';
    const defaultBrandId = document.defaultBrandId || 'cafeycodigo';
    const showScoreInBanner = Boolean(document.showScoreInBanner ?? true);

    const existing = await this.prisma.course.findUnique({
      where: { courseId },
    });

    let course;
    if (existing) {
      course = await this.prisma.course.update({
        where: { courseId },
        data: {
          title,
          version,
          category,
          institution,
          defaultBrandId,
          showScoreInBanner,
          document,
          authorId: authorId || existing.authorId,
        },
      });
    } else {
      course = await this.prisma.course.create({
        data: {
          courseId,
          title,
          version,
          category,
          institution,
          defaultBrandId,
          showScoreInBanner,
          document,
          authorId,
          status: 'DRAFT',
        },
      });
    }

    // Registrar historial de revisión
    await this.prisma.courseRevision.create({
      data: {
        courseId: course.id,
        document,
        authorId,
      },
    });

    return {
      message: 'Curso guardado exitosamente',
      courseId: course.courseId,
      version: course.version,
      updatedAt: course.updatedAt,
    };
  }

  async getAllCourses(status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
    const where = status ? { status } : {};
    const courses = await this.prisma.course.findMany({
      where,
      select: {
        id: true,
        courseId: true,
        title: true,
        version: true,
        category: true,
        institution: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            revisions: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return courses;
  }

  async getCourseBySlug(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { courseId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`El curso con slug "${courseId}" no fue encontrado`);
    }

    // Retorna el documento para que el aula o creador de /app lo renderice directamente
    return {
      ...course,
      document: course.document,
    };
  }

  async updateStatus(courseId: string, dto: UpdateCourseStatusDto) {
    const course = await this.prisma.course.findUnique({ where: { courseId } });
    if (!course) {
      throw new NotFoundException(`El curso "${courseId}" no existe`);
    }

    return this.prisma.course.update({
      where: { courseId },
      data: { status: dto.status },
    });
  }

  async deleteCourse(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { courseId } });
    if (!course) {
      throw new NotFoundException(`El curso "${courseId}" no existe`);
    }

    await this.prisma.course.delete({ where: { courseId } });
    return { message: `Curso "${courseId}" eliminado exitosamente` };
  }

  async getRevisions(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { courseId } });
    if (!course) {
      throw new NotFoundException(`El curso "${courseId}" no existe`);
    }

    return this.prisma.courseRevision.findMany({
      where: { courseId: course.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

