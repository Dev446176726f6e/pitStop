import { Module } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffController } from "./staff.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { WorkGraphicModule } from "../work_graphic/work_graphic.module";
import { MailModule } from "../common/mail/mail.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    WorkGraphicModule,
    MailModule,
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
