import { IsEmail, IsNumberString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
}
