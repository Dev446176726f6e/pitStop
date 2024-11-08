import { Module } from "@nestjs/common";
import { ResourceCategoryService } from "./resource_category.service";
import { ResourceCategoryController } from "./resource_category.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ResourceCategoryController],
  providers: [ResourceCategoryService],
})
export class ResourceCategoryModule {}
