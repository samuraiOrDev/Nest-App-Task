import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskStatus } from '../models/task.model';
import { User, UserRole } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>) { }


  async seed() {
    const tasks = [
      {
        title: 'Design Database Schema',
        description: 'Create a database schema for the application',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Implement User Authentication',
        description: 'Integrate user authentication using JWT',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Build RESTful API Endpoints',
        description: 'Develop RESTful API endpoints for various features',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Write Unit Tests',
        description: 'Create unit tests to ensure code quality and reliability',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Optimize Database Queries',
        description:
          'Improve the efficiency of database queries in the application',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Implement Frontend Components',
        description:
          'Develop frontend components for a seamless user interface',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Configure Continuous Integration',
        description:
          'Set up CI/CD pipelines for automated testing and deployment',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Document Codebase',
        description: 'Create comprehensive documentation for the project code',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Perform Code Review',
        description:
          'Conduct code reviews to ensure code quality and adherence to standards',
        status: TaskStatus.PENDING,
      },
      {
        title: 'Implement Error Handling',
        description:
          'Enhance error handling mechanisms for a robust application',
        status: TaskStatus.PENDING,
      },
      // Add more tasks as needed
    ];
    const users = [{
      username: "Samurai",
      email: "samurai@ordiales.com",
      password: bcrypt.hashSync("12345678", 10),
      role: UserRole.ADMIN
    },
    {
      username: "Ninja",
      email: "ninja@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
    }, {
      username: "Reina",
      email: "reina@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
    }, {
      username: "Sparky",
      email: "sparrky@gmail.com",
      password: bcrypt.hashSync("12345678", 10),
    }]

    await this.taskModel.deleteMany({});
    await this.userModel.deleteMany({});

    await this.taskModel.insertMany(tasks);
    await this.userModel.insertMany(users);
  }
}
