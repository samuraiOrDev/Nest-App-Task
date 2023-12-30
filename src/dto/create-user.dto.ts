import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../models/user.model';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/, {
  //   message:
  //     'The password must be at least 8 characters long, including at least one digit, one uppercase letter, one lowercase letter, and one special character.',
  // })

  password: string;

  @IsString()
  @IsEmail()
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
