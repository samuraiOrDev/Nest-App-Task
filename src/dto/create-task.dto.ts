import {IsString, IsNotEmpty, IsEnum, IsOptional} from 'class-validator';
import {TaskStatus} from '../models/task.model';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsEnum(TaskStatus)
  // status: TaskStatus;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
