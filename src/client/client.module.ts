import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../common/mail/mail.module";

@Module({
  imports: [PrismaModule, JwtModule.register({}), MailModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
