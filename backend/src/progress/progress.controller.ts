import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { CompleteContentDto, SubmitQuizDto } from './dto/progress.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Progreso y Gamificación (CoffeeCoins y Niveles)')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('leaderboard')
  @ApiOperation({ summary: 'Obtener tabla de clasificación pública de estudiantes (Top puntuaciones y niveles)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getLeaderboard(@Query('limit') limit?: number) {
    return this.progressService.getLeaderboard(limit ? Number(limit) : 10);
  }

  @Get(':courseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener el progreso actual del estudiante en un curso' })
  async getCourseProgress(
    @Param('courseId') courseId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.progressService.getCourseProgress(userId, courseId);
  }

  @Post(':courseId/complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar un contenido/widget como completado y reclamar puntos/CoffeeCoins' })
  async completeContent(
    @Param('courseId') courseId: string,
    @Body() dto: CompleteContentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.progressService.completeContent(userId, courseId, dto);
  }

  @Post(':courseId/quiz')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar intento de cuestionario o ejercicio interactivo y sumar recompensas' })
  async submitQuiz(
    @Param('courseId') courseId: string,
    @Body() dto: SubmitQuizDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.progressService.submitQuiz(userId, courseId, dto);
  }
}

