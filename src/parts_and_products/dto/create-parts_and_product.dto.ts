import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsDecimal,
  MaxLength,
  Min,
  IsNotEmpty,
} from "class-validator";

export class CreatePartsAndProductsDto {
  @IsString({ message: "Name must be a string." })
  @MaxLength(100, { message: "Name cannot exceed 100 characters." })
  name: string;

  @IsOptional()
  @IsString({ message: "Description must be a string." })
  description?: string;

  @IsDecimal({}, { message: "Price must be a valid decimal number." })
  // @IsPositive({ message: "Price must be a positive value." })
  price: string;

  @IsInt({ message: "Stock quantity must be an integer." })
  @Min(0, { message: "Stock quantity cannot be negative." })
  stock_quantity: number;

  @IsInt({ message: "Resource Type ID must be an integer." })
  @IsNotEmpty({ message: "Resource type must be provided." })
  resource_type_id: number;

  @IsInt({ message: "Category ID must be an integer." })
  @IsNotEmpty({ message: "Resource category must be provided." })
  category_id: number;
}
