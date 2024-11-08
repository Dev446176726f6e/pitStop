import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ServiceCenterModule } from "./service_center/service_center.module";
import { BranchModule } from "./branch/branch.module";
import { AdminModule } from "./admin/admin.module";
import { RoleModule } from "./role/role.module";
import { ServiceCategoryModule } from "./service_category/service_category.module";
import { ServiceModule } from "./service/service.module";
import { CarModule } from "./car/car.module";
import { ClientModule } from "./client/client.module";
import { SupplierModule } from "./supplier/supplier.module";
import { PromocodeModule } from "./promocode/promocode.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { ServiceListModule } from "./service_list/service_list.module";
import { ServiceListItemModule } from "./service_list_item/service_list_item.module";
import { PaymentModule } from "./payment/payment.module";
import { BasketModule } from "./basket/basket.module";
import { BasketItemModule } from "./basket_item/basket_item.module";
import { PartsAndProductsModule } from "./parts_and_products/parts_and_products.module";
import { ResourceCategoryModule } from "./resource_category/resource_category.module";
import { ResourceTypeModule } from "./resource_type/resource_type.module";
import { DepartmentModule } from "./department/department.module";
import { RoleSModule } from "./role_s/role_s.module";
// import { StaffRoleModule } from './staff_role/staff_role.module';
import { StaffModule } from "./staff/staff.module";
import { WorkGraphicModule } from "./work_graphic/work_graphic.module";
import { MailModule } from './common/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    ServiceCenterModule,
    BranchModule,
    AdminModule,
    RoleModule,
    ServiceCategoryModule,
    ServiceModule,
    CarModule,
    ClientModule,
    SupplierModule,
    PromocodeModule,
    AppointmentModule,
    ServiceListModule,
    ServiceListItemModule,
    PaymentModule,
    BasketModule,
    BasketItemModule,
    PartsAndProductsModule,
    ResourceCategoryModule,
    ResourceTypeModule,
    DepartmentModule,
    RoleSModule,
    StaffModule,
    WorkGraphicModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
