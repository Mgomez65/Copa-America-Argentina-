import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ description: 'Nombre de usuario del nuevo usuario' })
  username: string;

  @ApiProperty({ description: 'Correo electrónico del nuevo usuario' })
  email: string;

  @ApiProperty({ description: 'Contraseña del nuevo usuario', minLength: 6, maxLength: 20 })
  password: string;

  @ApiProperty({ description: 'Nombre del nuevo usuario' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del nuevo usuario' })
  apellido: string;
}
