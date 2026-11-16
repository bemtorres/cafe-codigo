import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token de restablecimiento recibido por correo' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'NuevaPassword456!', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
  newPassword: string;
}

