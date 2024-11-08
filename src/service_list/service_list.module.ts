import { Module } from "@nestjs/common";
import { ServiceListService } from "./service_list.service";
import { ServiceListController } from "./service_list.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ServiceListController],
  providers: [ServiceListService],
  exports: [ServiceListService],
})
export class ServiceListModule {}
