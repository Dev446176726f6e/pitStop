import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ServiceCenterService } from "./service_center.service";
import { CreateServiceCenterDto } from "./dto/create-service_center.dto";
import { UpdateServiceCenterDto } from "./dto/update-service_center.dto";

@Controller("service-center")
export class ServiceCenterController {
  constructor(private readonly serviceCenterService: ServiceCenterService) {}

  @Post()
  create(@Body() createServiceCenterDto: CreateServiceCenterDto) {
    return this.serviceCenterService.create(createServiceCenterDto);
  }

  @Get()
  findAll() {
    return this.serviceCenterService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.serviceCenterService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateServiceCenterDto: UpdateServiceCenterDto
  ) {
    return this.serviceCenterService.update(+id, updateServiceCenterDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.serviceCenterService.remove(+id);
  }
}
