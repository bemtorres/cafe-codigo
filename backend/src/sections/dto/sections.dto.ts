import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MembershipStatus } from '@prisma/client';

export class CreateSectionDto {
  @ApiProperty({ example: 'Programación II - Sección 1 (2026)' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la sección es obligatorio' })
  name: string;

  @ApiProperty({ example: 'PROG2-2026', description: 'Código único para unirse' })
  @IsString()
  @IsNotEmpty({ message: 'El código de la sección es obligatorio' })
  code: string;

  @ApiProperty({ example: 'Comisión de los días martes y jueves', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: ['primeros-pasos-algoritmos'], required: false })
  @IsArray()
  @IsOptional()
  courseIds?: string[];
}

export class JoinSectionDto {
  @ApiProperty({ example: 'PROG2-2026', description: 'Código de acceso de la sección' })
  @IsString()
  @IsNotEmpty({ message: 'El código de la sección es obligatorio' })
  code: string;
}

export class UpdateMemberStatusDto {
  @ApiProperty({ enum: ['APPROVED', 'REJECTED'], example: 'APPROVED' })
  @IsEnum(MembershipStatus, { message: 'El estado debe ser APPROVED o REJECTED' })
  @IsNotEmpty()
  status: 'APPROVED' | 'REJECTED';
}

export class LinkCoursesDto {
  @ApiProperty({ example: ['primeros-pasos-algoritmos'], description: 'IDs o slugs de los cursos a vincular' })
  @IsArray()
  @ArrayNotEmpty({ message: 'Debes especificar al menos un curso' })
  courseIds: string[];
}

export class CreateGroupDto {
  @ApiProperty({ example: 'Grupo 1 - Proyecto Algoritmos' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del grupo es obligatorio' })
  name: string;

  @ApiProperty({ example: ['uuid-estudiante-1', 'uuid-estudiante-2'] })
  @IsArray()
  @IsOptional()
  memberIds?: string[];

  @ApiProperty({ example: 'uuid-estudiante-1', description: 'ID del estudiante representante del grupo' })
  @IsString()
  @IsNotEmpty({ message: 'El grupo debe tener asignado un representante' })
  leaderId: string;
}

export class UpdateGroupDto {
  @ApiProperty({ example: 'Grupo 1 - Modificado', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: ['uuid-estudiante-1', 'uuid-estudiante-3'], required: false })
  @IsArray()
  @IsOptional()
  memberIds?: string[];

  @ApiProperty({ example: 'uuid-estudiante-3', required: false })
  @IsString()
  @IsOptional()
  leaderId?: string;
}

export class CreateForumTopicDto {
  @ApiProperty({ example: 'Debate: ¿Cuándo usar recursión vs iteración?' })
  @IsString()
  @IsNotEmpty({ message: 'El título del tema es obligatorio' })
  title: string;

  @ApiProperty({ example: 'Compartan ejemplos prácticos de complejidad temporal en algoritmos.' })
  @IsString()
  @IsNotEmpty({ message: 'El contenido del tema es obligatorio' })
  content: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;
}

export class CreateForumPostDto {
  @ApiProperty({ example: 'En mi equipo encontramos que la recursión es más limpia para árboles binarios.' })
  @IsString()
  @IsNotEmpty({ message: 'La respuesta no puede estar vacía' })
  content: string;
}

