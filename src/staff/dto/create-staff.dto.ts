import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  IsPhoneNumber,
  IsEnum,
  IsStrongPassword,
  IsNotEmpty,
  Validate,
  IsNumber,
  IsIn,
  IsPositive,
} from "class-validator";
import { Staff_Status } from "@prisma/client";
import { IsPasswordMatch } from "../../common/validation/confirm_password.validation";

export class CreateStaffDto {
  @IsString({ message: "Fullname must be a string" })
  @Length(3, 255, { message: "Fullname must be between 3 and 255 characters" })
  fullname: string;

  @IsString({ message: "Username must be a string" })
  @Length(3, 255, { message: "Username must be between 3 and 255 characters" })
  username: string;

  //   @IsString({ message: "Password must be a string" })
  //   @Length(6, 255, { message: "Password must be at least 6 characters long" })
  //   hashed_password: string;

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

  @IsString()
  @IsNotEmpty({ message: "Confirm password must be provided." })
  @Validate(IsPasswordMatch, {
    message: "Password and confirm password must match!",
  })
  confirm_password: string;

  @IsPhoneNumber("UZ", { message: "Phone number must be a valid phone number" })
  phone_number: string;

  @IsInt({ message: "Role ID must be an integer" })
  role_id: number;

  @IsInt({ message: "Department ID must be an integer" })
  @IsPositive({ message: "ID cannot be negative number" })
  department_id: number;

  @IsString({ message: "Employment date must be a string" })
  employement_date: string;

  @IsOptional()
  activation_link: string;

  // @IsInt({ message: "Work schedule ID must be an integer" })
  // work_scheduele_id: number;

  //   @IsOptional()
  //   @IsBoolean({ message: "Is Active must be a boolean value" })
  //   is_active?: boolean;

  //   @IsOptional()
  //   @IsEnum(Staff_Status, { message: "Status must be a valid Staff Status" })
  //   status?: Staff_Status;

  //   @IsOptional()
  //   @IsString({ message: "Token must be a string" })
  //   token?: string;
}
