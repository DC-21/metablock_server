import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phonenumber: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  constructor(d: UserRegisterDto) {
    this.username = d.username;
    this.email = d.email;
    this.password = d.password;
    this.phonenumber = d.phonenumber;
  }
}
