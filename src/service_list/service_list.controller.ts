import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ServiceListService } from "./service_list.service";
import { CreateServiceListDto } from "./dto/create-service_list.dto";
import { UpdateServiceListDto } from "./dto/update-service_list.dto";

@Controller("service-list")
export class ServiceListController {
  constructor(private readonly serviceListService: ServiceListService) {}

  @Post()
  create(@Body() createServiceListDto: CreateServiceListDto) {
    return this.serviceListService.createServiceList(createServiceListDto);
  }

  @Get()
  findAll() {
    return this.serviceListService.findAllServiceLists();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.serviceListService.findOneServiceList(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateServiceListDto: UpdateServiceListDto
  ) {
    return this.serviceListService.updateServiceList(+id, updateServiceListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.serviceListService.removeServiceList(+id);
  }
}
