import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({ example: 'Algoritmos y Lógica - Sección 1 (2026)' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la comisión o aula es obligatorio' })
  name: string;

  @ApiProperty({ example: 'ALGO-SEC1-2026', description: 'Código único de acceso para el aula' })
  @IsString()
  @IsNotEmpty({ message: 'El código del aula es obligatorio' })
  code: string;

  @ApiProperty({ example: 'primeros-pasos-algoritmos', description: 'Slug o ID del curso asignado' })
  @IsString()
  @IsNotEmpty({ message: 'El curso es obligatorio' })
  courseId: string;

  @ApiProperty({ example: 'Comisión de turno mañana para estudiantes de primer año', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class RegisterStudentDto {
  @ApiProperty({ example: 'Carlos Mendoza' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del estudiante es obligatorio' })
  name: string;

  @ApiProperty({ example: 'carlos.mendoza@universidad.edu' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({ example: 'primeros-pasos-algoritmos', description: 'Slug del curso al que se matricula' })
  @IsString()
  @IsNotEmpty({ message: 'El identificador del curso es obligatorio' })
  courseId: string;

  @ApiProperty({ required: false, description: 'ID de la comisión o aula creada por el docente' })
  @IsString()
  @IsOptional()
  classroomId?: string;
}

