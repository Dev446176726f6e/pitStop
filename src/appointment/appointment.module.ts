import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { ServiceListItemModule } from "../service_list_item/service_list_item.module";
import { BasketItemModule } from "../basket_item/basket_item.module";
import { BasketModule } from "../basket/basket.module";
import { PaymentModule } from "../payment/payment.module";
import { ServiceListModule } from "../service_list/service_list.module";
import { ServiceListService } from "../service_list/service_list.service";

@Module({
  imports: [
    PrismaModule,
    ServiceListItemModule,
    ServiceListModule,
    BasketItemModule,
    BasketModule,
    PaymentModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
