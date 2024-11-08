import { Module } from "@nestjs/common";
import { RoleSService } from "./role_s.service";
import { RoleSController } from "./role_s.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [RoleSController],
  providers: [RoleSService],
})
export class RoleSModule {}
