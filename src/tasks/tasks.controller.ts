import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { TasksService, TypeResponseTask } from './tasks.service';
import { Task } from 'src/models/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TasksController {

  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async findAll(): Promise<{ msg: string; tasks: Task[] }> {
    try {
      const result = await this.tasksService.findAll();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TypeResponseTask> {
    try {
      const result = await this.tasksService.findOne(id);
      if (result.msg === 'ko') {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post()
  async create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ): Promise<TypeResponseTask> {
    try {
      const result = await this.tasksService.create(createTaskDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ): Promise<TypeResponseTask> {
    try {
      const result = await this.tasksService.update(id, updateTaskDto);
      if (result.msg === 'ko') {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TypeResponseTask> {
    try {
      const result = await this.tasksService.delete(id);
      if (result.msg === 'ko') {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
