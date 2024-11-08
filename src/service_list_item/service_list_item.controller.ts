import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ServiceListItemService } from "./service_list_item.service";
import { CreateServiceListItemDto } from "./dto/create-service_list_item.dto";
import { UpdateServiceListItemDto } from "./dto/update-service_list_item.dto";

@Controller("service-list-item")
export class ServiceListItemController {
  constructor(
    private readonly serviceListItemService: ServiceListItemService
  ) {}

  @Post()
  create(@Body() createServiceListItemDto: CreateServiceListItemDto) {
    return this.serviceListItemService.createServiceListItem(
      createServiceListItemDto
    );
  }

  @Get()
  findAll() {
    return this.serviceListItemService.findAllServiceListItems();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.serviceListItemService.findOneServiceListItem(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateServiceListItemDto: UpdateServiceListItemDto
  ) {
    return this.serviceListItemService.updateServiceListItem(
      +id,
      updateServiceListItemDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.serviceListItemService.removeServiceListItem(+id);
  }
}
