import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  ValidateIf,
  Length,
  Equals,
  Validate,
  ValidationArguments,
  IsOptional,
} from "class-validator";
import { IsPasswordMatch } from "../../common/validation/confirm_password.validation";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: "First name must not be empty." })
  @Length(1, 50, { message: "First name must be between 1 and 50 characters." })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: "Last name must not be empty." })
  @Length(1, 50, { message: "Last name must be between 1 and 50 characters." })
  last_name: string;

  @IsString()
  @IsNotEmpty({ message: "Phone number must be provided." })
  @Matches(/^[0-9]{12}$/, {
    message: "Phone number must be a valid 12-digit number.",
  })
  phone_number: string;

  @IsString()
  @IsEmail(
    { allow_display_name: true, allow_underscores: true },
    { message: "Email must be valid." }
  )
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
      minLowercase: 1,
    },
    {
      message:
        "Password must be at least 8 characters long, with at least one number, one symbol, one uppercase, and one lowercase letter.",
    }
  )
  password: string;

  @IsOptional()
  activation_link: string;

  @IsString()
  @IsNotEmpty({ message: "Confirm password must be provided." })
  @Validate(IsPasswordMatch, {
    message: "Password and confirm password must match!",
  })
  confirm_password: string;
}
