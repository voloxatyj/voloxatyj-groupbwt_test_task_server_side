import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class UsersService {
	createUser(createUserDto: CreateUserDto) {}
	findUserById(id: number) {}
}
