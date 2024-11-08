import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class StaffSignInDto {
  // @IsEmail({}, { message: "Please provide a valid email address." })
  @IsNotEmpty({ message: "Username (email) is required." })
  readonly username: string;

  @IsString({ message: "Password must be a string." })
  @IsNotEmpty({ message: "Password is required." })
  readonly password: string;
}
