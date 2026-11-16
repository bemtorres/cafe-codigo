import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { CreateClassroomDto, RegisterStudentDto } from './dto/teachers.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Portal Docente (Teachers)')
@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TEACHER', 'ADMIN')
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('dashboard')
  @ApiOperation({
    summary: 'Dashboard del docente: comisiones activas, promedio de avance y alumnos a cargo',
  })
  async getTeacherDashboard(@CurrentUser('id') teacherId: string) {
    return this.teachersService.getTeacherDashboard(teacherId);
  }

  @Get('classrooms')
  @ApiOperation({ summary: 'Listar comisiones / aulas del docente' })
  async getClassrooms(@CurrentUser('id') teacherId: string) {
    return this.teachersService.getClassrooms(teacherId);
  }

  @Post('classrooms')
  @ApiOperation({ summary: 'Crear una nueva comisión / aula con código de clase' })
  async createClassroom(
    @CurrentUser('id') teacherId: string,
    @Body() dto: CreateClassroomDto,
  ) {
    return this.teachersService.createClassroom(teacherId, dto);
  }

  @Post('students/register')
  @ApiOperation({
    summary: 'Registrar o matricular a un estudiante en un curso y notificarlo por correo SMTP',
  })
  async registerStudent(
    @CurrentUser('id') teacherId: string,
    @Body() dto: RegisterStudentDto,
  ) {
    return this.teachersService.registerStudent(teacherId, dto);
  }

  @Get('classrooms/:id/students')
  @ApiOperation({
    summary: 'Obtener el seguimiento de avance en tiempo real de todos los alumnos de un aula',
  })
  async getClassroomStudentsProgress(
    @CurrentUser('id') teacherId: string,
    @Param('id') classroomId: string,
  ) {
    return this.teachersService.getClassroomStudentsProgress(teacherId, classroomId);
  }
}

