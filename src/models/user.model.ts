import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
