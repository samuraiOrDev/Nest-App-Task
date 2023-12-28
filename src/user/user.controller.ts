import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
}
