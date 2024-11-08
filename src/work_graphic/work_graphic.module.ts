import { Module } from "@nestjs/common";
import { WorkGraphicService } from "./work_graphic.service";
import { WorkGraphicController } from "./work_graphic.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [WorkGraphicController],
  providers: [WorkGraphicService],
  exports: [WorkGraphicService],
})
export class WorkGraphicModule {}
