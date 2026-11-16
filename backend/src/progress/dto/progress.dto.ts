import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class CompleteContentDto {
  @ApiProperty({ description: 'ID del módulo actual' })
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @ApiProperty({ description: 'ID de la lession actual' })
  @IsString()
  @IsNotEmpty()
  lessionId: string;

  @ApiProperty({ description: 'ID de la sección actual' })
  @IsString()
  @IsNotEmpty()
  seccionId: string;

  @ApiProperty({ description: 'ID del contenido completado' })
  @IsString()
  @IsNotEmpty()
  contenidoId: string;
}

export class SubmitQuizDto {
  @ApiProperty({ description: 'ID del widget de evaluación o desafío' })
  @IsString()
  @IsNotEmpty()
  widgetId: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  score: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  maxScore: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  isPassed: boolean;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  details?: Record<string, any>;
}

