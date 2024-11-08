import { Module } from "@nestjs/common";
import { ServiceCategoryService } from "./service_category.service";
import { ServiceCategoryController } from "./service_category.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService],
})
export class ServiceCategoryModule {}
