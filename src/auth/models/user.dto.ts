export class RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  role: string;
  person?: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
