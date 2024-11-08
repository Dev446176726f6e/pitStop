import { Module } from "@nestjs/common";
import { ServiceListItemService } from "./service_list_item.service";
import { ServiceListItemController } from "./service_list_item.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ServiceListItemController],
  providers: [ServiceListItemService],
  exports: [ServiceListItemService],
})
export class ServiceListItemModule {}
