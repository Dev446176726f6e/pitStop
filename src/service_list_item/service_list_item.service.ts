import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceListItemDto } from "./dto/create-service_list_item.dto";
import { UpdateServiceListItemDto } from "./dto/update-service_list_item.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ServiceListItemService {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async createServiceListItem(
    createServiceListItemDto: CreateServiceListItemDto
  ) {
    const existingServiceList =
      await this.prismaSerivce.service_List.findUnique({
        where: { id: createServiceListItemDto.service_list_id },
      });

    if (!existingServiceList) {
      throw new NotFoundException("Service list with this ID not found");
    }

    const existingService = await this.prismaSerivce.service.findUnique({
      where: { id: createServiceListItemDto.service_id },
    });

    if (!existingService) {
      throw new NotFoundException("Service not found");
    }

    const new_service_list_item =
      await this.prismaSerivce.service_List_Item.create({
        data: { ...createServiceListItemDto },
      });
    return new_service_list_item;
  }

  findAllServiceListItems() {
    return this.prismaSerivce.service_List_Item.findMany();
  }

  findOneServiceListItem(id: number) {
    return this.prismaSerivce.service_List_Item.findUnique({ where: { id } });
  }

  async updateServiceListItem(
    id: number,
    updateServiceListItemDto: UpdateServiceListItemDto
  ) {
    const existingServiceList =
      await this.prismaSerivce.service_List.findUnique({
        where: { id: updateServiceListItemDto.service_list_id },
      });

    if (!existingServiceList) {
      throw new NotFoundException("Service list with this ID not found");
    }

    const existingService = await this.prismaSerivce.service.findUnique({
      where: { id: updateServiceListItemDto.service_id },
    });

    if (!existingService) {
      throw new NotFoundException("Service not found");
    }
    const updated_service_list_item =
      await this.prismaSerivce.service_List_Item.update({
        where: { id },
        data: { ...updateServiceListItemDto },
      });
    return updated_service_list_item;
  }

  removeServiceListItem(id: number) {
    return this.prismaSerivce.service_List_Item.delete({ where: { id } });
  }
}
