import { Module } from "@nestjs/common";
import { BasketItemService } from "./basket_item.service";
import { BasketItemController } from "./basket_item.controller";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BasketItemController],
  providers: [BasketItemService],
  exports: [BasketItemService],
})
export class BasketItemModule {}
