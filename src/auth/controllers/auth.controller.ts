import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalGuard } from '../../utils/local.guard';
import { AuthService } from '../services/auth.service';
import { LoginUserDto, RegisterUserDto } from '../models/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginUserDto) {
    return req.session;
  }
}
