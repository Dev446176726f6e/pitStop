import { Module } from "@nestjs/common";
import { ServiceCenterService } from "./service_center.service";
import { ServiceCenterController } from "./service_center.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ServiceCenterController],
  providers: [ServiceCenterService],
})
export class ServiceCenterModule {}
