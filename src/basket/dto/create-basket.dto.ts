import {
  IsInt,
  IsDecimal,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPositive,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateBasketItemDto } from "../../basket_item/dto/create-basket_item.dto";

export class CreateBasketDto {
  // @IsDecimal(
  //   { decimal_digits: "0,2" },
  //   {
  //     message:
  //       "Total price must be a valid decimal with up to 2 decimal places",
  //   }
  // )
  // total_price: number;
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateBasketItemDto)
  // basket_items: CreateBasketItemDto[];
}
