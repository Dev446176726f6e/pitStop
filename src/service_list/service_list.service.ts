import { Injectable } from "@nestjs/common";
import { CreateServiceListDto } from "./dto/create-service_list.dto";
import { UpdateServiceListDto } from "./dto/update-service_list.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ServiceListService {
  constructor(private readonly prismaService: PrismaService) {}

  async createServiceList(createServiceListDto: CreateServiceListDto) {
    // const new_service_list = await this.prismaService.service_List.create({})
    return this.prismaService.service_List.create({
      data: { ...createServiceListDto },
    });
  }

  findAllServiceLists() {
    return this.prismaService.service_List.findMany();
  }

  findOneServiceList(id: number) {
    return this.prismaService.service_List.findUnique({ where: { id } });
  }

  updateServiceList(id: number, updateServiceListDto: UpdateServiceListDto) {
    return this.prismaService.service_List.update({
      where: { id },
      data: { ...updateServiceListDto },
    });
  }

  removeServiceList(id: number) {
    return this.prismaService.service_List.delete({ where: { id } });
  }
}
