import { Injectable } from "@nestjs/common";
import { CreateServiceCenterDto } from "./dto/create-service_center.dto";
import { UpdateServiceCenterDto } from "./dto/update-service_center.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ServiceCenterService {
  constructor(private prismaService: PrismaService) {}

  async create(createServiceCenterDto: CreateServiceCenterDto) {
    const new_service_center = await this.prismaService.service_Center.create({
      data: { ...createServiceCenterDto },
    });
    return new_service_center;
  }

  findAll() {
    return this.prismaService.service_Center.findMany();
  }

  findOne(id: number) {
    return this.prismaService.service_Center.findUnique({ where: { id } });
  }

  async update(id: number, updateServiceCenterDto: UpdateServiceCenterDto) {
    const updated_service_center =
      await this.prismaService.service_Center.update({
        where: { id },
        data: { ...updateServiceCenterDto },
      });
    return updated_service_center;
  }

  remove(id: number) {
    return this.prismaService.service_Center.delete({ where: { id } });
  }
}
