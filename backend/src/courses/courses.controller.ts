import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { SaveCourseDto, UpdateCourseStatusDto } from './dto/courses.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Cursos y Contenidos (/app)')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Guardar o actualizar un curso con la estructura /app (Módulos, Lessions, Widgets)',
  })
  async saveCourse(@Body() dto: SaveCourseDto, @CurrentUser('id') userId: string) {
    return this.coursesService.saveCourse(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener el catálogo de cursos disponibles' })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] })
  async getAllCourses(@Query('status') status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
    return this.coursesService.getAllCourses(status);
  }

  @Get(':courseId')
  @ApiOperation({ summary: 'Obtener el documento completo de un curso por su slug para el aula' })
  async getCourseBySlug(@Param('courseId') courseId: string) {
    return this.coursesService.getCourseBySlug(courseId);
  }

  @Patch(':courseId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar el estado de publicación de un curso (DRAFT, PUBLISHED, ARCHIVED)' })
  async updateStatus(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseStatusDto,
  ) {
    return this.coursesService.updateStatus(courseId, dto);
  }

  @Delete(':courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un curso (Solo Administradores)' })
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.coursesService.deleteCourse(courseId);
  }

  @Get(':courseId/revisions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Historial de revisiones del curso' })
  async getRevisions(@Param('courseId') courseId: string) {
    return this.coursesService.getRevisions(courseId);
  }
}

