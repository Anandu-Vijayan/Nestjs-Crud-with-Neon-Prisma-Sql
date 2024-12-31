import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsEnum(['INTERN', 'EMPLOYEE', 'ENGINEER', 'ADMIN'], {
    message: 'Valid roles required',
  })
  role: 'INTERN' | 'EMPLOYEE' | 'ENGINEER' | 'ADMIN';
}
