import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({ description: 'ID Token obtenido desde Google Identity Services / One Tap en el frontend' })
  @IsString()
  @IsNotEmpty({ message: 'El idToken de Google es obligatorio' })
  idToken: string;
}

