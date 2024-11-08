import { PartialType } from "@nestjs/mapped-types";
import {
  IsOptional,
  IsInt,
  IsString,
  IsDecimal,
  IsPositive,
  MaxLength,
  Min,
} from "class-validator";
import { CreatePartsAndProductsDto } from "./create-parts_and_product.dto";

export class UpdatePartsAndProductsDto extends PartialType(
  CreatePartsAndProductsDto
) {
  @IsOptional()
  @IsString({ message: "Name must be a string." })
  @MaxLength(100, { message: "Name cannot exceed 100 characters." })
  name?: string;

  @IsOptional()
  @IsString({ message: "Description must be a string." })
  description?: string;

  @IsOptional()
  @IsDecimal({}, { message: "Price must be a valid decimal number." })
  // @IsPositive({ message: "Price must be a positive value." })
  price?: string;

  @IsOptional()
  @IsInt({ message: "Stock quantity must be an integer." })
  @Min(0, { message: "Stock quantity cannot be negative." })
  stock_quantity?: number;

  @IsOptional()
  @IsInt({ message: "Resource Type ID must be an integer." })
  resource_type_id?: number;

  @IsOptional()
  @IsInt({ message: "Category ID must be an integer." })
  category_id?: number;
}
