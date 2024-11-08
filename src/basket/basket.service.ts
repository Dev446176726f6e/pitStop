import { Injectable } from "@nestjs/common";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) {}

  createBasket(createBasketDto: CreateBasketDto) {
    const new_basket = this.prismaService.basket.create({
      data: { ...createBasketDto },
    });
    return new_basket;
  }

  findAllBaskets() {
    return this.prismaService.basket.findMany();
  }

  findOneBasket(id: number) {
    return this.prismaService.basket.findUnique({ where: { id } });
  }

  updateBasket(id: number, updateBasketDto: UpdateBasketDto) {
    return this.prismaService.basket.update({
      where: { id },
      data: { ...updateBasketDto },
    });
  }

  removeBasket(id: number) {
    return this.prismaService.basket.delete({ where: { id } });
  }
}
