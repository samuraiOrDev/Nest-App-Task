import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import * as dotenv from 'dotenv';


dotenv.config();

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule { }
