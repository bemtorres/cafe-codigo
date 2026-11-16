import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class SaveCourseDto {
  @ApiProperty({
    description: 'Documento completo del curso de Café y Código (/app)',
    example: {
      courseId: 'primeros-pasos-algoritmos',
      title: 'Primeros pasos con algoritmos',
      version: '1.0.0',
      institution: 'Café y Código',
      defaultBrandId: 'cafeycodigo',
      showScoreInBanner: true,
      modulos: [],
    },
  })
  @IsObject()
  @IsNotEmpty()
  document: Record<string, any>;

  @ApiProperty({ required: false, description: 'ID de la revisión previa para control de concurrencia' })
  @IsString()
  @IsOptional()
  revision?: string;
}

export class UpdateCourseStatusDto {
  @ApiProperty({ enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], example: 'PUBLISHED' })
  @IsString()
  @IsNotEmpty()
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

