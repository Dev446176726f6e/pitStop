import { Injectable } from "@nestjs/common";
import { CreateBasketItemDto } from "./dto/create-basket_item.dto";
import { UpdateBasketItemDto } from "./dto/update-basket_item.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BasketItemService {
  constructor(private readonly prismaService: PrismaService) {}

  createBasketItem(createBasketItemDto: CreateBasketItemDto) {
    return this.prismaService.basket_Item.create({
      data: { ...createBasketItemDto },
    });
  }

  findAllBasketItems() {
    return this.prismaService.basket_Item.findMany();
  }

  findOneBasketItem(id: number) {
    return this.prismaService.basket_Item.findUnique({ where: { id } });
  }

  updateBasketItem(id: number, updateBasketItemDto: UpdateBasketItemDto) {
    return this.prismaService.basket_Item.update({
      where: { id },
      data: { ...updateBasketItemDto },
    });
  }

  removeBasketItem(id: number) {
    return this.prismaService.basket_Item.delete({ where: { id } });
  }
}
