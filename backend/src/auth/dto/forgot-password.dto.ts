import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'juan.perez@example.com' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;
}

