import { Controller, Post, Body, Get, HttpStatus, HttpException, ValidationPipe, UseGuards, Request, Param, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {

    const isExist = await this.userService.findOneUser(createUserDto.email);
    if (isExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  @Get(':id')
  async getUserById(@Param() id: string): Promise<User> {

    try {
      const user = await this.userService.findOneUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(@Request() req, @Query() queryParams: { role: string }): Promise<User[]> {

    const { role = 'all' } = queryParams;

    const user = req.user;
    if (user.role !== 'admin') {
      throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.userService.findAllUsers(role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
