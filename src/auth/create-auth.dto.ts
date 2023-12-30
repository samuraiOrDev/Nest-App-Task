import { IsNotEmpty, IsString } from "class-validator";



export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  password: string;


  @IsString()
  @IsNotEmpty()
  email: string;
}
