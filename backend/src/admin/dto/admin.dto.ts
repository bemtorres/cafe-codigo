import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserRoleDto {
  @ApiProperty({ enum: Role, example: 'EDITOR' })
  @IsEnum(Role, { message: 'El rol debe ser STUDENT, EDITOR o ADMIN' })
  @IsNotEmpty()
  role: Role;
}

export class AdjustCoinsDto {
  @ApiProperty({ example: 50, description: 'Cantidad de CoffeeCoins a sumar o restar' })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'Premio por concurso', required: false })
  @IsString()
  @IsOptional()
  reason?: string;
}

