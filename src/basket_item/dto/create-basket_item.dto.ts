import { IsInt, IsPositive } from "class-validator";

export class CreateBasketItemDto {
  @IsInt({ message: "Basket ID must be an integer" })
  basket_id: number;

  @IsInt({ message: "Parts and Products ID must be an integer" })
  parts_and_products_id: number;

  @IsInt({ message: "Quantity must be an integer" })
  @IsPositive({ message: "Quantity must be a positive integer" })
  quantity: number;
}
