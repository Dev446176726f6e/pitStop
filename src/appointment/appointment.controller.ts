import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { CreateBasketItemDto } from "../basket_item/dto/create-basket_item.dto";
import { CreateServiceListItemDto } from "../service_list_item/dto/create-service_list_item.dto";
// import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Post("add/basket-item")
  async addBasketItem(@Body() createBasketItem: CreateBasketItemDto) {
    return this.appointmentService.addBasketItem(createBasketItem);
  }

  @Post()
  removeBasketItem() {}

  @Post("add/service-list-item")
  addServiceListItem(@Body() createServiceListItem: CreateServiceListItemDto) {
    return this.appointmentService.addServiceListItem(createServiceListItem);
  }

  // @Post()
  // removeServiceListItem() {}
  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
  // //   return this.appointmentService.update(+id, updateAppointmentDto);
  // // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentService.remove(+id);
  }
}
