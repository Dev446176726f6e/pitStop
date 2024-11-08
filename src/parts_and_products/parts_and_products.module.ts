import { Module } from "@nestjs/common";
import { PartsAndProductsService } from "./parts_and_products.service";
import { PartsAndProductsController } from "./parts_and_products.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PartsAndProductsController],
  providers: [PartsAndProductsService],
})
export class PartsAndProductsModule {}
