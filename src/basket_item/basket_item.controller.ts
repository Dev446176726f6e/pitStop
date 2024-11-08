import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BasketItemService } from "./basket_item.service";
import { CreateBasketItemDto } from "./dto/create-basket_item.dto";
import { UpdateBasketItemDto } from "./dto/update-basket_item.dto";

@Controller("basket-item")
export class BasketItemController {
  constructor(private readonly basketItemService: BasketItemService) {}

  @Post()
  create(@Body() createBasketItemDto: CreateBasketItemDto) {
    return this.basketItemService.createBasketItem(createBasketItemDto);
  }

  @Get()
  findAll() {
    return this.basketItemService.findAllBasketItems();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.basketItemService.findOneBasketItem(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBasketItemDto: UpdateBasketItemDto
  ) {
    return this.basketItemService.updateBasketItem(+id, updateBasketItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.basketItemService.removeBasketItem(+id);
  }
}
