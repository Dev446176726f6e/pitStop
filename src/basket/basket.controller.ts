import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BasketService } from "./basket.service";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";

@Controller("basket")
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  create(@Body() createBasketDto: CreateBasketDto) {
    return this.basketService.createBasket(createBasketDto);
  }

  @Get()
  findAll() {
    return this.basketService.findAllBaskets();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.basketService.findOneBasket(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.updateBasket(+id, updateBasketDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.basketService.removeBasket(+id);
  }
}
