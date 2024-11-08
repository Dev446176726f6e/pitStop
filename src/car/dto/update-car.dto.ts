import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsDateString,
  Min,
  Max,
  Matches,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import {
  Body_Type,
  Car_Status,
  Engine_Type,
  Transmission_Type,
} from "@prisma/client";

export class UpdateCarDto {
  // ! he cannot update client_id just easily.

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9]{1,7}$/, {
    message: "Manufacturer must be a valid string and not empty.",
  })
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9]{1,7}$/, {
    message: "Model must be a valid string and not empty.",
  })
  model?: string;

  @IsOptional()
  @IsInt({ message: "Year must be an integer." })
  @Min(1900, { message: "Year must be greater than or equal to 1900." })
  @Max(new Date().getFullYear(), {
    message: `Year must not exceed the current year (${new Date().getFullYear()}).`,
  })
  year?: number;

  @IsOptional()
  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message: "VIN must be a valid 17 character VIN (excluding I, O, Q).",
  })
  VIN?: string;

  @IsOptional()
  @IsString()
  // @Matches(/^(0[1-9]|1[0-4])\s\d{3}\s[A-Za-z]{2}$/, {
  //   message:
  //     "License plate must be in the format: XX 123 AB, where XX is a valid regional code.",
  // })
  license_plate?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Registered date must be in the format YYYY-MM-DD without time.",
  })
  registered_date: string;

  @IsOptional()
  @IsEnum(Engine_Type, { message: "Engine type must be a valid engine type." })
  engine_type?: Engine_Type;

  @IsOptional()
  @IsEnum(Transmission_Type, {
    message: "Transmission type must be a valid transmission type.",
  })
  transmission?: Transmission_Type;

  @IsOptional()
  @IsInt({ message: "Mileage must be an integer." })
  @Min(0, { message: "Mileage must be a non-negative number." })
  mileage?: number;

  @IsOptional()
  @IsEnum(Body_Type, { message: "Body type must be a valid body type." })
  body_type?: Body_Type;

  @IsOptional()
  @IsString()
  insurance_details?: string;

  @IsOptional()
  @IsEnum(Car_Status, { message: "Status must be a valid car status." })
  status?: Car_Status;

  @IsOptional()
  @IsString()
  notes?: string;
}
