import { Module } from "@nestjs/common";
import { ResourceTypeService } from "./resource_type.service";
import { ResourceTypeController } from "./resource_type.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ResourceTypeController],
  providers: [ResourceTypeService],
})
export class ResourceTypeModule {}
