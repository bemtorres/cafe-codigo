import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdjustCoinsDto, UpdateUserRoleDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Panel de Administración (Admin Dashboard)')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Métricas e indicadores globales para el dashboard administrativo' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Listar usuarios registrados con filtros por rol y búsqueda' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'role', required: false, enum: Role })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('role') role?: Role,
    @Query('search') search?: string,
  ) {
    return this.adminService.getUsers(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
      role,
      search,
    );
  }

  @Patch('users/:id/role')
  @ApiOperation({ summary: 'Cambiar el rol de un usuario (STUDENT, EDITOR, ADMIN)' })
  async updateUserRole(
    @Param('id') userId: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.adminService.updateUserRole(userId, dto.role);
  }

  @Patch('users/:id/coins')
  @ApiOperation({ summary: 'Ajustar o asignar CoffeeCoins a un usuario' })
  async adjustUserCoins(
    @Param('id') userId: string,
    @Body() dto: AdjustCoinsDto,
  ) {
    return this.adminService.adjustUserCoins(userId, dto.amount);
  }

  @Get('courses')
  @ApiOperation({ summary: 'Listado administrativo detallado de todos los cursos en /app' })
  async getAdminCourses() {
    return this.adminService.getAdminCourses();
  }

  @Get('activities')
  @ApiOperation({ summary: 'Registro cronológico de actividades recientes en la plataforma' })
  async getRecentActivities() {
    return this.adminService.getRecentActivities();
  }
}

