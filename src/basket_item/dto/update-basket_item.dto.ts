import { IsInt, IsOptional, IsPositive } from "class-validator";

export class UpdateBasketItemDto {
  @IsOptional()
  @IsInt({ message: "Basket ID must be an integer" })
  basket_id?: number;

  @IsOptional()
  @IsInt({ message: "Parts and Products ID must be an integer" })
  parts_and_products_id?: number;

  @IsOptional()
  @IsInt({ message: "Quantity must be an integer" })
  @IsPositive({ message: "Quantity must be a positive integer" })
  quantity?: number;
}
