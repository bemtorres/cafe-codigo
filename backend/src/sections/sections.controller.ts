import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import {
  CreateForumPostDto,
  CreateForumTopicDto,
  CreateGroupDto,
  CreateSectionDto,
  JoinSectionDto,
  LinkCoursesDto,
  UpdateGroupDto,
  UpdateMemberStatusDto,
} from './dto/sections.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Secciones, Grupos y Foros (/app)')
@Controller('sections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  // ========================================================
  // SECCIONES
  // ========================================================

  @Post()
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Crear una nueva sección con código único de unión' })
  async createSection(@CurrentUser('id') teacherId: string, @Body() dto: CreateSectionDto) {
    return this.sectionsService.createSection(teacherId, dto);
  }

  @Get('teacher')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Listar secciones creadas por el docente con conteo de solicitudes pendientes' })
  async getTeacherSections(@CurrentUser('id') teacherId: string) {
    return this.sectionsService.getTeacherSections(teacherId);
  }

  @Get('student')
  @ApiOperation({ summary: 'Listar secciones en las que el estudiante está inscrito o pendiente' })
  async getStudentSections(@CurrentUser('id') userId: string) {
    return this.sectionsService.getStudentSections(userId);
  }

  @Post('join')
  @ApiOperation({ summary: 'Solicitar unirse a una sección mediante código de clase (Queda PENDING)' })
  async joinSectionByCode(@CurrentUser('id') userId: string, @Body() dto: JoinSectionDto) {
    return this.sectionsService.joinSectionByCode(userId, dto.code);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de la sección, cursos vinculados y grupo del usuario' })
  async getSectionById(@Param('id') sectionId: string, @CurrentUser('id') userId: string) {
    return this.sectionsService.getSectionById(sectionId, userId);
  }

  // ========================================================
  // SOLICITUDES Y APROBACIONES
  // ========================================================

  @Get(':id/requests')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Listar alumnos que solicitaron ingreso con código y esperan aprobación' })
  async getSectionPendingRequests(
    @Param('id') sectionId: string,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.sectionsService.getSectionPendingRequests(sectionId, teacherId);
  }

  @Patch(':id/requests/:userId')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Aprobar (APPROVED) o rechazar (REJECTED) la solicitud de ingreso de un alumno' })
  async updateMemberStatus(
    @Param('id') sectionId: string,
    @Param('userId') targetUserId: string,
    @CurrentUser('id') teacherId: string,
    @Body() dto: UpdateMemberStatusDto,
  ) {
    return this.sectionsService.updateMemberStatus(sectionId, teacherId, targetUserId, dto);
  }

  // ========================================================
  // VINCULAR CURSOS
  // ========================================================

  @Post(':id/courses')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Vincular cursos a la sección y matricular automáticamente a los alumnos aprobados' })
  async linkCoursesToSection(
    @Param('id') sectionId: string,
    @CurrentUser('id') teacherId: string,
    @Body() dto: LinkCoursesDto,
  ) {
    return this.sectionsService.linkCoursesToSection(sectionId, teacherId, dto);
  }

  // ========================================================
  // GRUPOS DE TRABAJO Y REPRESENTANTE
  // ========================================================

  @Post(':id/groups')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Crear grupo de trabajo con representante obligatorio' })
  async createGroup(
    @Param('id') sectionId: string,
    @CurrentUser('id') teacherId: string,
    @Body() dto: CreateGroupDto,
  ) {
    return this.sectionsService.createGroup(sectionId, teacherId, dto);
  }

  @Get(':id/groups')
  @ApiOperation({ summary: 'Listar grupos formados (con representante) y alumnos sin grupo' })
  async getSectionGroups(@Param('id') sectionId: string, @CurrentUser('id') userId: string) {
    return this.sectionsService.getSectionGroups(sectionId, userId);
  }

  @Patch(':id/groups/:groupId')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Modificar miembros o cambiar el representante del grupo' })
  async updateGroup(
    @Param('id') sectionId: string,
    @Param('groupId') groupId: string,
    @CurrentUser('id') teacherId: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.sectionsService.updateGroup(sectionId, groupId, teacherId, dto);
  }

  @Delete(':id/groups/:groupId')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Eliminar grupo (los alumnos vuelven a estado individual sin grupo)' })
  async deleteGroup(
    @Param('id') sectionId: string,
    @Param('groupId') groupId: string,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.sectionsService.deleteGroup(sectionId, groupId, teacherId);
  }

  // ========================================================
  // FOROS DE DEBATE
  // ========================================================

  @Get(':id/forum/topics')
  @ApiOperation({ summary: 'Listar temas de discusión en el foro de la sección' })
  async getForumTopics(@Param('id') sectionId: string, @CurrentUser('id') userId: string) {
    return this.sectionsService.getForumTopics(sectionId, userId);
  }

  @Post(':id/forum/topics')
  @ApiOperation({ summary: 'Crear un nuevo tema de debate en el foro' })
  async createForumTopic(
    @Param('id') sectionId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateForumTopicDto,
  ) {
    return this.sectionsService.createForumTopic(sectionId, userId, dto);
  }

  @Get(':id/forum/topics/:topicId')
  @ApiOperation({ summary: 'Obtener un tema de discusión con todas sus respuestas' })
  async getTopicWithPosts(
    @Param('id') sectionId: string,
    @Param('topicId') topicId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.sectionsService.getTopicWithPosts(sectionId, topicId, userId);
  }

  @Post(':id/forum/topics/:topicId/posts')
  @ApiOperation({ summary: 'Responder a un tema de debate en el foro' })
  async replyToTopic(
    @Param('id') sectionId: string,
    @Param('topicId') topicId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateForumPostDto,
  ) {
    return this.sectionsService.replyToTopic(sectionId, topicId, userId, dto);
  }

  // ========================================================
  // ANALÍTICA Y SEGUIMIENTO EN TIEMPO REAL
  // ========================================================

  @Get(':id/analytics')
  @UseGuards(RolesGuard)
  @Roles('TEACHER', 'ADMIN')
  @ApiOperation({ summary: 'Matriz completa de avance y notas de todos los alumnos de la sección' })
  async getSectionAnalytics(
    @Param('id') sectionId: string,
    @CurrentUser('id') teacherId: string,
  ) {
    return this.sectionsService.getSectionAnalytics(sectionId, teacherId);
  }
}

