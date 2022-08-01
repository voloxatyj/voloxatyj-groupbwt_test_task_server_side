import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = this.userService.findUserById(id);
    // if (user) res.send(user);
    res.status(400).send({ msg: 'User not found' });
  }

  @Get('/search/:id')
  async searchUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findUserById(id);
    // if (user) return user;
    throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }
}
