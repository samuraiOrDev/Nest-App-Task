import {UserRole} from '../models/user.model';

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  role?: UserRole;
}

export class CreateUserDtoResponse {
  user: CreateUserDto;
  token: string;
}
export class ValidateUserDto {
  password: string;
  email: string;
}
