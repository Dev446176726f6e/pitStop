import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ServiceCenterModule } from "./service_center/service_center.module";
import { BranchModule } from "./branch/branch.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    ServiceCenterModule,
    BranchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
