import { Type } from "class-transformer";
import {
  IsArray,
  IsDecimal,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { UpdateBasketItemDto } from "../../basket_item/dto/update-basket_item.dto";

export class UpdateBasketDto {
  @IsOptional()
  @IsDecimal(
    { decimal_digits: "0,2" },
    {
      message:
        "Total price must be a valid decimal with up to 2 decimal places",
    }
  )
  total_price?: number;

  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => UpdateBasketItemDto)
  // basket_items?: UpdateBasketItemDto[];
}
