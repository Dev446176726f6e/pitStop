import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  IsPhoneNumber,
  IsEnum,
} from "class-validator";
import { Staff_Status } from "@prisma/client";

export class UpdateStaffDto {
  @IsOptional()
  @IsString({ message: "Fullname must be a string" })
  @Length(3, 255, { message: "Fullname must be between 3 and 255 characters" })
  fullname?: string;

  @IsOptional()
  @IsString({ message: "Username must be a string" })
  @Length(3, 255, { message: "Username must be between 3 and 255 characters" })
  username?: string;

  // @IsOptional()
  // @IsString({ message: "Password must be a string" })
  // @Length(6, 255, { message: "Password must be at least 6 characters long" })
  // hashed_password?: string;

  // password change will be in different dto.

  @IsOptional()
  @IsPhoneNumber("US", { message: "Phone number must be a valid phone number" })
  phone_number?: string;

  @IsOptional()
  @IsInt({ message: "Role ID must be an integer" })
  role_id?: number;

  @IsOptional()
  @IsInt({ message: "Department ID must be an integer" })
  department_id?: number;

  @IsOptional()
  @IsString({ message: "Employment date must be a string" })
  employement_date?: string;

  @IsOptional()
  @IsInt({ message: "Work schedule ID must be an integer" })
  work_scheduele_id?: number;

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
