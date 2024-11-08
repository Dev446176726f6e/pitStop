import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
  @IsOptional({})
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail(
    { allow_display_name: true, allow_underscores: true },
    { message: "Email must be valid" }
  )
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        "Password length must be at least 8. It must have at least one number, symbol and uppercase.",
    }
  )
  @IsNotEmpty({ message: "Password must be provided" })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "Confirm password must be provided" })
  confirm_password: string;

  @IsString()
  @IsNotEmpty({ message: "Initial role must be provided." })
  @Transform(({ value }) => value.toUpperCase())
  readonly role: string;
}
