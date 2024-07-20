import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
