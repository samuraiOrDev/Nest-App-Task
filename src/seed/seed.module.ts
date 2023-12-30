import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../models/task.model';
import { User, UserSchema } from '../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }],
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [SeedController],
  providers: [SeedService],
})

export class SeedModule { }
