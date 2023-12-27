import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../models/task.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
// eslint-disable-next-line prettier/prettier
export class SeedModule { }
