import { Transform } from "class-transformer";
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateServiceDto {
  @IsString({ message: "Name must be a valid string." })
  @IsNotEmpty({ message: "Name must be provided." })
  @MinLength(1, { message: "Minimum service name length is 1." })
  @MaxLength(100, { message: "Name length cannot exceed 100." })
  name: string;

  @IsOptional()
  @IsString({ message: "Description must be a valid string." })
  @MinLength(1, { message: "Description cannot be empty." })
  @MaxLength(500, { message: "Description length cannot exceed 500 symbols." })
  description: string;

  @IsInt({ message: "Category ID must be a valid integer." })
  @IsPositive({ message: "ID cannot be a negative number." })
  @IsNotEmpty({ message: "Category ID must be provided." })
  //   @Min(1, { message: "ID starts from 1." })
  category_id: number;

  @IsOptional()
  @IsString({ message: "Average duration must be a valid string." })
  average_duration: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Price must be a valid number." }
  )
  //   @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty({ message: "Price of service must be provided." })
  @IsPositive({ message: "Price cannot be negative." })
  price: number;
}
