import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, username, email } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      username,
      password: hashedPassword,
      email,
    });

    await user.save();

    return user;
  }

  async findOneUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
  async findOneUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findAllUsers(role: string): Promise<User[]> {

    if (role === 'all') return await this.userModel.find().exec();
    const query = { $text: { $search: role.toLowerCase() } };
    return await this.userModel.find(query).exec();
  }
}
