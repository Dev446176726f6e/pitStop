import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateServiceCategoryDto {
  @IsString()
  @MinLength(1, { message: "Minimum length of service-category name is 1" })
  @MaxLength(100, { message: "Name length cannot exceed 100" })
  @IsNotEmpty({ message: "Name must be provided" })
  name: string;

  @IsOptional()
  @IsString({ message: "Description must be valid string" })
  @MinLength(1, { message: "Cannot give empty description" })
  @MaxLength(500, { message: "Description cannot exceed 500 symbols" })
  description: string;
}
