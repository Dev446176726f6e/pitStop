import { Optional } from "@nestjs/common";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateServiceCenterDto {
  @IsString()
  @MinLength(1, { message: "Minimum length of the service-center should 1" })
  @MaxLength(100, { message: "Name length cannot exceed 100" })
  @IsNotEmpty({ message: "Name of service-senter cannot be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "Address cannot be empty" })
  address: string;

  @IsArray({ message: "Location must be an array with latitude and longitude" })
  @ArrayMinSize(2, { message: "Location array must have 2 elements" })
  @ArrayMaxSize(2, { message: "Location array can only have 2 elements" })
  @IsNumber({}, { each: true })
  @Min(-90, { each: true, message: "Latitude/Longitude must be valid" })
  @Max(90, { each: true, message: "Latitude/Longitude must be valid" })
  location: [number, number];

  @IsPhoneNumber("UZ")
  contact_number: string;

  @IsEmail(
    { allow_display_name: true, allow_underscores: true },
    { message: "Please provide a valid email address." }
  )
  @IsNotEmpty({ message: "Email must be provided" })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: "Description cannot be empty" })
  @MaxLength(300, { message: "Description length cannot exceed 300" })
  description: string;

  @IsOptional()
  @IsUrl()
  website: string;
}
