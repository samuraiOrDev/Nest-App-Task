import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../models/task.model';

export interface TypeResponseTask {
  msg: string;
  task: Task;
}
@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }
  private tasks = [];

  async findAll(): Promise<{ msg: string; tasks: Task[] }> {
    const tasks = await this.taskModel.find().exec();
    return {
      msg: 'ok',
      tasks,
    };
  }
  async findOne(id: string): Promise<TypeResponseTask> {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      return {
        msg: 'No existe',
        task: null,
      };
    }
    return {
      msg: 'ok',
      task: task,
    };
  }
  async create(task: any): Promise<TypeResponseTask> {
    const createdTask = new this.taskModel(task);
    const savedTask = await createdTask.save();
    return {
      msg: 'ok',
      task: savedTask,
    };
  }
  async update(id: string, updateTaskDto: any): Promise<TypeResponseTask> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) {
      return { msg: 'ko', task: null };
    }
    return { msg: 'ok', task: updatedTask };
  }

  async delete(id: string): Promise<TypeResponseTask> {
    const deletedTask = await this.taskModel
      .findByIdAndDelete(id, { new: true })
      .exec();
    if (!deletedTask) {
      return { msg: 'ko', task: null };
    }
    return { msg: 'ok', task: deletedTask };
  }
}
