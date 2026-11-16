import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import {
  CreateForumPostDto,
  CreateForumTopicDto,
  CreateGroupDto,
  CreateSectionDto,
  LinkCoursesDto,
  UpdateGroupDto,
  UpdateMemberStatusDto,
} from './dto/sections.dto';

@Injectable()
export class SectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) { }

  private extractTotalWidgetsCount(document: any): number {
    if (!document || !Array.isArray(document.modulos)) return 1;
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

  // ========================================================
  // 1. SECCIONES (Crear, Listar, Detalle)
  // ========================================================

  async createSection(teacherId: string, dto: CreateSectionDto) {
    const code = dto.code.trim().toUpperCase();

    const existing = await this.prisma.section.findUnique({
      where: { code },
    });

    if (existing) {
      throw new ConflictException(`Ya existe una sección con el código "${code}"`);
    }

    const section = await this.prisma.section.create({
      data: {
        name: dto.name.trim(),
        code,
        description: dto.description?.trim(),
        teacherId,
      },
    });

    // Si se enviaron cursos iniciales para vincular
    if (dto.courseIds && dto.courseIds.length > 0) {
      await this.linkCoursesToSection(section.id, teacherId, { courseIds: dto.courseIds });
    }

    return this.prisma.section.findUnique({
      where: { id: section.id },
      include: {
        courses: { include: { course: { select: { id: true, courseId: true, title: true } } } },
      },
    });
  }

  async getTeacherSections(teacherId: string) {
    const sections = await this.prisma.section.findMany({
      where: { teacherId },
      include: {
        courses: {
          include: {
            course: {
              select: { id: true, courseId: true, title: true, version: true, status: true },
            },
          },
        },
        _count: {
          select: {
            members: true,
            groups: true,
            topics: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Contar pendientes de aprobación por sección
    const sectionIds = sections.map((s) => s.id);
    const pendingCounts = await this.prisma.sectionMember.groupBy({
      by: ['sectionId'],
      where: {
        sectionId: { in: sectionIds },
        status: 'PENDING',
      },
      _count: { userId: true },
    });

    const pendingMap = new Map(pendingCounts.map((p) => [p.sectionId, p._count.userId]));

    return sections.map((s) => ({
      ...s,
      pendingRequestsCount: pendingMap.get(s.id) || 0,
    }));
  }

  async getStudentSections(userId: string) {
    const memberships = await this.prisma.sectionMember.findMany({
      where: { userId },
      include: {
        section: {
          include: {
            teacher: { select: { id: true, name: true, email: true } },
            courses: {
              include: {
                course: { select: { id: true, courseId: true, title: true, version: true } },
              },
            },
            _count: {
              select: { members: true, topics: true, groups: true },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return memberships.map((m) => ({
      membershipStatus: m.status,
      joinedAt: m.joinedAt,
      section: m.section,
    }));
  }

  async getSectionById(sectionId: string, userId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        teacher: { select: { id: true, name: true, email: true, avatarUrl: true } },
        courses: {
          include: {
            course: {
              select: { id: true, courseId: true, title: true, version: true, document: true },
            },
          },
        },
        _count: {
          select: { members: true, groups: true, topics: true },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('Sección no encontrada');
    }

    const isTeacher = section.teacherId === userId;
    let membership = await this.prisma.sectionMember.findUnique({
      where: { sectionId_userId: { sectionId, userId } },
    });

    if (!isTeacher && (!membership || membership.status !== 'APPROVED')) {
      return {
        id: section.id,
        name: section.name,
        code: section.code,
        description: section.description,
        teacher: section.teacher,
        membershipStatus: membership?.status || 'NOT_MEMBER',
        isPendingApproval: membership?.status === 'PENDING',
      };
    }

    // Buscar si el alumno pertenece a algún grupo
    let myGroup = null;
    if (!isTeacher) {
      const groupMember = await this.prisma.workGroupMember.findFirst({
        where: { userId, group: { sectionId } },
        include: {
          group: {
            include: {
              leader: { select: { id: true, name: true, email: true } },
              members: {
                include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
              },
            },
          },
        },
      });

      if (groupMember) {
        myGroup = {
          id: groupMember.group.id,
          name: groupMember.group.name,
          leader: groupMember.group.leader,
          isLeader: groupMember.group.leaderId === userId,
          members: groupMember.group.members.map((m) => ({
            ...m.user,
            isLeader: m.user.id === groupMember.group.leaderId,
          })),
        };
      }
    }

    return {
      ...section,
      isTeacher,
      membershipStatus: isTeacher ? 'TEACHER' : 'APPROVED',
      myGroup,
    };
  }

  // ========================================================
  // 2. UNIÓN CON CÓDIGO Y APROBACIÓN DE ALUMNOS
  // ========================================================

  async joinSectionByCode(userId: string, code: string) {
    const cleanCode = code.trim().toUpperCase();
    const section = await this.prisma.section.findUnique({
      where: { code: cleanCode },
      include: { teacher: { select: { name: true } } },
    });

    if (!section) {
      throw new NotFoundException(`No existe ninguna sección con el código "${cleanCode}"`);
    }

    if (section.teacherId === userId) {
      throw new BadRequestException('Eres el docente de esta sección, no puedes unirte como alumno');
    }

    const existingMember = await this.prisma.sectionMember.findUnique({
      where: { sectionId_userId: { sectionId: section.id, userId } },
    });

    if (existingMember) {
      if (existingMember.status === 'APPROVED') {
        return { message: 'Ya eres miembro aprobado de esta sección', status: 'APPROVED', sectionId: section.id };
      }
      if (existingMember.status === 'PENDING') {
        return { message: 'Tu solicitud ya está en espera de aprobación por el docente', status: 'PENDING', sectionId: section.id };
      }
      if (existingMember.status === 'REJECTED') {
        // Permitir volver a solicitar si fue rechazado previamente
        await this.prisma.sectionMember.update({
          where: { id: existingMember.id },
          data: { status: 'PENDING' },
        });
        return { message: 'Solicitud enviada nuevamente al docente', status: 'PENDING', sectionId: section.id };
      }
    }

    await this.prisma.sectionMember.create({
      data: {
        sectionId: section.id,
        userId,
        status: 'PENDING',
      },
    });

    return {
      message: `Solicitud enviada. Tu docente (${section.teacher.name}) debe aprobar tu ingreso.`,
      status: 'PENDING',
      sectionId: section.id,
      sectionName: section.name,
    };
  }

  async getSectionPendingRequests(sectionId: string, teacherId: string) {
    const section = await this.prisma.section.findUnique({ where: { id: sectionId } });
    if (!section) throw new NotFoundException('Sección no encontrada');
    if (section.teacherId !== teacherId) throw new ForbiddenException('No tienes acceso a esta sección');

    return this.prisma.sectionMember.findMany({
      where: { sectionId, status: 'PENDING' },
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
      orderBy: { joinedAt: 'asc' },
    });
  }

  async updateMemberStatus(
    sectionId: string,
    teacherId: string,
    targetUserId: string,
    dto: UpdateMemberStatusDto,
  ) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        teacher: { select: { id: true, name: true } },
        courses: true,
      },
    });

    if (!section) throw new NotFoundException('Sección no encontrada');
    if (section.teacherId !== teacherId) throw new ForbiddenException('No tienes permisos en esta sección');

    const membership = await this.prisma.sectionMember.findUnique({
      where: { sectionId_userId: { sectionId, userId: targetUserId } },
      include: { user: true },
    });

    if (!membership) {
      throw new NotFoundException('El usuario no ha solicitado ingreso a esta sección');
    }

    const updated = await this.prisma.sectionMember.update({
      where: { id: membership.id },
      data: { status: dto.status },
    });

    // Si fue APROBADO:
    if (dto.status === 'APPROVED') {
      // 1. Matricularlo automáticamente en todos los cursos vinculados a esta sección
      for (const sc of section.courses) {
        await this.prisma.enrollment.upsert({
          where: {
            userId_courseId: {
              userId: targetUserId,
              courseId: sc.courseId,
            },
          },
          update: {
            registeredById: teacherId,
          },
          create: {
            userId: targetUserId,
            courseId: sc.courseId,
            registeredById: teacherId,
          },
        });
      }

      // 2. Enviar correo de notificación al estudiante
      this.mailService
        .sendSectionApprovalNotification(
          membership.user.email,
          membership.user.name,
          section.name,
          section.teacher.name,
        )
        .catch(() => { });
    }

    return {
      message: `El estudiante fue ${dto.status === 'APPROVED' ? 'aprobado' : 'rechazado'} exitosamente`,
      membership: updated,
    };
  }

  // ========================================================
  // 3. VINCULAR CURSOS A LA SECCIÓN
  // ========================================================

  async linkCoursesToSection(sectionId: string, teacherId: string, dto: LinkCoursesDto) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { members: { where: { status: 'APPROVED' } } },
    });

    if (!section) throw new NotFoundException('Sección no encontrada');
    if (section.teacherId !== teacherId) throw new ForbiddenException('No tienes permisos en esta sección');

    const linkedCourses = [];

    for (const identifier of dto.courseIds) {
      const course = await this.prisma.course.findFirst({
        where: { OR: [{ id: identifier }, { courseId: identifier }] },
      });

      if (course) {
        await this.prisma.sectionCourse.upsert({
          where: {
            sectionId_courseId: {
              sectionId,
              courseId: course.id,
            },
          },
          update: {},
          create: {
            sectionId,
            courseId: course.id,
          },
        });

        // Asegurar que todos los alumnos aprobados de la sección queden matriculados
        for (const member of section.members) {
          await this.prisma.enrollment.upsert({
            where: {
              userId_courseId: {
                userId: member.userId,
                courseId: course.id,
              },
            },
            update: { registeredById: teacherId },
            create: {
              userId: member.userId,
              courseId: course.id,
              registeredById: teacherId,
            },
          });
        }

        linkedCourses.push(course.title);
      }
    }

    return {
      message: `Se vincularon ${linkedCourses.length} cursos a la sección`,
      linkedCourses,
    };
  }

  // ========================================================
  // 4. GRUPOS DE TRABAJO Y REPRESENTANTE
  // ========================================================

  async createGroup(sectionId: string, teacherId: string, dto: CreateGroupDto) {
    const section = await this.prisma.section.findUnique({ where: { id: sectionId } });
    if (!section) throw new NotFoundException('Sección no encontrada');
    if (section.teacherId !== teacherId) throw new ForbiddenException('No tienes permisos en esta sección');

    // Verificar que el representante esté dentro de la sección
    const leaderMember = await this.prisma.sectionMember.findUnique({
      where: { sectionId_userId: { sectionId, userId: dto.leaderId } },
      include: { user: true },
    });

    if (!leaderMember || leaderMember.status !== 'APPROVED') {
      throw new BadRequestException('El representante debe ser un estudiante aprobado de esta sección');
    }

    const group = await this.prisma.workGroup.create({
      data: {
        sectionId,
        name: dto.name.trim(),
        leaderId: dto.leaderId,
      },
    });

    // Agregar miembros (incluyendo obligatoriamente al representante)
    const memberIdsSet = new Set(dto.memberIds || []);
    memberIdsSet.add(dto.leaderId);

    for (const memberId of memberIdsSet) {
      // Remover de otros grupos de esta misma sección para evitar duplicados
      const prevMemberships = await this.prisma.workGroupMember.findMany({
        where: { userId: memberId, group: { sectionId } },
      });
      for (const prev of prevMemberships) {
        await this.prisma.workGroupMember.delete({ where: { id: prev.id } });
      }

      await this.prisma.workGroupMember.create({
        data: {
          groupId: group.id,
          userId: memberId,
        },
      });
    }

    // Notificar al representante
    this.mailService
      .sendLeaderAssignedNotification(
        leaderMember.user.email,
        leaderMember.user.name,
        group.name,
        section.name,
      )
      .catch(() => { });

    return this.prisma.workGroup.findUnique({
      where: { id: group.id },
      include: {
        leader: { select: { id: true, name: true, email: true } },
        members: { include: { user: { select: { id: true, name: true, email: true } } } },
      },
    });
  }

  async getSectionGroups(sectionId: string, userId: string) {
    const section = await this.prisma.section.findUnique({ where: { id: sectionId } });
    if (!section) throw new NotFoundException('Sección no encontrada');

    const groups = await this.prisma.workGroup.findMany({
      where: { sectionId },
      include: {
        leader: { select: { id: true, name: true, email: true, avatarUrl: true } },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                levelCode: true,
                coffeeCoins: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Obtener alumnos aprobados que están "Sin grupo"
    const assignedMemberUserIds = new Set<string>();
    groups.forEach((g) => g.members.forEach((m) => assignedMemberUserIds.add(m.userId)));

    const unassignedStudents = await this.prisma.sectionMember.findMany({
      where: {
        sectionId,
        status: 'APPROVED',
        userId: { notIn: Array.from(assignedMemberUserIds) },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            levelCode: true,
            coffeeCoins: true,
          },
        },
      },
    });

    return {
      groups: groups.map((g) => ({
        id: g.id,
        name: g.name,
        leader: g.leader,
        membersCount: g.members.length,
        members: g.members.map((m) => ({
          ...m.user,
          isLeader: m.user.id === g.leaderId,
        })),
      })),
      unassignedStudents: unassignedStudents.map((u) => u.user),
    };
  }

  async updateGroup(sectionId: string, groupId: string, teacherId: string, dto: UpdateGroupDto) {
    const group = await this.prisma.workGroup.findFirst({
      where: { id: groupId, sectionId, section: { teacherId } },
    });
    if (!group) throw new NotFoundException('Grupo no encontrado o sin permisos');

    if (dto.name) {
      await this.prisma.workGroup.update({ where: { id: groupId }, data: { name: dto.name.trim() } });
    }

    if (dto.leaderId) {
      await this.prisma.workGroup.update({ where: { id: groupId }, data: { leaderId: dto.leaderId } });
    }

    if (dto.memberIds) {
      await this.prisma.workGroupMember.deleteMany({ where: { groupId } });
      const membersToAdd = new Set(dto.memberIds);
      if (group.leaderId) membersToAdd.add(group.leaderId);

      for (const uid of membersToAdd) {
        await this.prisma.workGroupMember.create({
          data: { groupId, userId: uid },
        });
      }
    }

    return this.prisma.workGroup.findUnique({
      where: { id: groupId },
      include: {
        leader: { select: { id: true, name: true, email: true } },
        members: { include: { user: { select: { id: true, name: true, email: true } } } },
      },
    });
  }

  async deleteGroup(sectionId: string, groupId: string, teacherId: string) {
    const group = await this.prisma.workGroup.findFirst({
      where: { id: groupId, sectionId, section: { teacherId } },
    });
    if (!group) throw new NotFoundException('Grupo no encontrado');

    await this.prisma.workGroup.delete({ where: { id: groupId } });
    return { message: 'Grupo eliminado correctamente. Los alumnos volvieron al estado sin grupo.' };
  }

  // ========================================================
  // 5. FOROS DE DEBATE
  // ========================================================

  async createForumTopic(sectionId: string, authorId: string, dto: CreateForumTopicDto) {
    const topic = await this.prisma.forumTopic.create({
      data: {
        sectionId,
        authorId,
        title: dto.title.trim(),
        content: dto.content.trim(),
        isPinned: Boolean(dto.isPinned),
      },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true, role: true } },
      },
    });

    return topic;
  }

  async getForumTopics(sectionId: string, userId: string) {
    return this.prisma.forumTopic.findMany({
      where: { sectionId },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true, role: true } },
        _count: { select: { posts: true } },
      },
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  async getTopicWithPosts(sectionId: string, topicId: string, userId: string) {
    const topic = await this.prisma.forumTopic.findFirst({
      where: { id: topicId, sectionId },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true, role: true } },
        posts: {
          include: {
            author: { select: { id: true, name: true, avatarUrl: true, role: true, levelCode: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!topic) throw new NotFoundException('Tema del foro no encontrado');
    return topic;
  }

  async replyToTopic(sectionId: string, topicId: string, authorId: string, dto: CreateForumPostDto) {
    const topic = await this.prisma.forumTopic.findFirst({
      where: { id: topicId, sectionId },
    });

    if (!topic) throw new NotFoundException('Tema no encontrado');

    const post = await this.prisma.forumPost.create({
      data: {
        topicId,
        authorId,
        content: dto.content.trim(),
      },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true, role: true, levelCode: true } },
      },
    });

    // Actualizar fecha del topic
    await this.prisma.forumTopic.update({
      where: { id: topicId },
      data: { updatedAt: new Date() },
    });

    return post;
  }

  // ========================================================
  // 6. MATRIZ DE ANALÍTICA Y SEGUIMIENTO EN TIEMPO REAL
  // ========================================================

  async getSectionAnalytics(sectionId: string, teacherId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        courses: { include: { course: true } },
        groups: {
          include: {
            leader: { select: { id: true, name: true } },
            members: { select: { userId: true } },
          },
        },
      },
    });

    if (!section) throw new NotFoundException('Sección no encontrada');
    if (section.teacherId !== teacherId) throw new ForbiddenException('No tienes permisos');

    // Alumnos aprobados
    const members = await this.prisma.sectionMember.findMany({
      where: { sectionId, status: 'APPROVED' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            levelCode: true,
            coffeeCoins: true,
            points: true,
          },
        },
      },
    });

    // Mapear grupo y si es representante
    const groupByUser = new Map<string, { groupName: string; isLeader: boolean }>();
    for (const g of section.groups) {
      for (const m of g.members) {
        groupByUser.set(m.userId, {
          groupName: g.name,
          isLeader: m.userId === g.leaderId,
        });
      }
    }

    const linkedCourses = section.courses.map((sc) => ({
      id: sc.course.id,
      courseId: sc.course.courseId,
      title: sc.course.title,
      totalWidgets: this.extractTotalWidgetsCount(sc.course.document),
    }));

    // Matrículas y progreso de cada estudiante
    const studentIds = members.map((m) => m.userId);
    const courseIds = linkedCourses.map((c) => c.id);

    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        userId: { in: studentIds },
        courseId: { in: courseIds },
      },
    });

    const enrollMap = new Map<string, any>();
    enrollments.forEach((e) => {
      enrollMap.set(`${e.userId}_${e.courseId}`, e);
    });

    const studentsMatrix = members.map((m) => {
      const gInfo = groupByUser.get(m.userId) || { groupName: 'Sin grupo', isLeader: false };

      const coursesProgress = linkedCourses.map((c) => {
        const enr = enrollMap.get(`${m.userId}_${c.id}`);
        const completed = enr?.completedContentIds?.length || 0;
        const percent = Math.min(100, Math.round((completed / c.totalWidgets) * 100));

        return {
          courseId: c.courseId,
          courseTitle: c.title,
          percent,
          completedCount: completed,
          totalCount: c.totalWidgets,
          score: enr?.score || 0,
          isCompleted: enr?.isCompleted || false,
        };
      });

      const avgPercent =
        coursesProgress.length > 0
          ? Math.round(
            coursesProgress.reduce((acc, curr) => acc + curr.percent, 0) / coursesProgress.length,
          )
          : 0;

      return {
        id: m.user.id,
        name: m.user.name,
        email: m.user.email,
        levelCode: m.user.levelCode,
        coffeeCoins: m.user.coffeeCoins,
        groupName: gInfo.groupName,
        isLeader: gInfo.isLeader,
        averageProgress: avgPercent,
        courses: coursesProgress,
      };
    });

    return {
      section: {
        id: section.id,
        name: section.name,
        code: section.code,
      },
      totalStudents: members.length,
      linkedCourses: linkedCourses.map((c) => ({ courseId: c.courseId, title: c.title })),
      students: studentsMatrix,
    };
  }
}

