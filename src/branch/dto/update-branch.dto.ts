import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class UpdateBranchDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: "Minimum length of the service-center should 1" })
  @MaxLength(100, { message: "Name length cannot exceed 100" })
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  //   @IsNumber()
  //   @IsNotEmpty({ message: "Service center ID must be provided" })
  //   service_center_id: number;

  @IsOptional()
  @IsArray({ message: "Location must be an array with latitude and longitude" })
  @ArrayMinSize(2, { message: "Location array must have 2 elements" })
  @ArrayMaxSize(2, { message: "Location array can only have 2 elements" })
  @IsNumber({}, { each: true })
  @Min(-90, { each: true, message: "Latitude/Longitude must be valid" })
  @Max(90, { each: true, message: "Latitude/Longitude must be valid" })
  location: [number, number];

  @IsOptional()
  @IsPhoneNumber("UZ")
  contact_number: string;

  @IsOptional()
  @IsEmail(
    { allow_display_name: true, allow_underscores: true },
    { message: "Please provide a valid email address." }
  )
  email: string;

  @IsOptional()
  @IsArray({
    message: "Operating hourse should include start time and end time",
  })
  @ArrayMaxSize(2, { message: "Operating times cannot be more than two." })
  @ArrayMinSize(2, { message: "Operating times should be at least two" })
  operating_hours: [string, string];

  @IsOptional()
  @IsString()
  @MinLength(1, { message: "Description cannot be empty" })
  @MaxLength(300, { message: "Description length cannot exceed 300" })
  description: string;
}
