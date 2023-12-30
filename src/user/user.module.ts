import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '3d' },
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule { }
