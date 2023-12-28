import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { TasksModule } from './tasks/tasks.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    TasksModule,
    SeedModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
