import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateServiceDto {
  @IsOptional()
  @IsString({ message: "Name must be a valid string." })
  @MinLength(1, { message: "Minimum service name length is 1." })
  @MaxLength(100, { message: "Name length cannot exceed 100." })
  name: string;

  @IsOptional()
  @IsString({ message: "Description must be a valid string." })
  @MinLength(1, { message: "Description cannot be empty." })
  @MaxLength(500, { message: "Description length cannot exceed 500 symbols." })
  description: string;

  @IsOptional()
  @IsString({ message: "Average duration must be a valid string." })
  average_duration: string;

  // what should i do with price.? should i make it available to update.
  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Price must be a valid number." }
  )
  @IsPositive({ message: "Price cannot be negative." })
  price: number;
}
