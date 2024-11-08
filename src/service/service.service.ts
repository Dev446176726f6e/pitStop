import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const existingService = await this.prismaService.service.findUnique({
      where: { name: createServiceDto.name },
    }); // bu so'rovni kuchaytirish kerak. misol uchun shu kabi so'zni o'z ichiga oladimi yo'qmi.

    if (existingService) {
      throw new ConflictException("Service with this name already exists");
    }

    const existingServiceCategory =
      await this.prismaService.service_Category.findUnique({
        where: { id: createServiceDto.category_id },
      });

    if (!existingServiceCategory) {
      throw new NotFoundException("Service category with this ID not found");
    }

    const new_service = await this.prismaService.service.create({
      data: { ...createServiceDto },
    });
    return new_service;
  }

  findAll() {
    return this.prismaService.service.findMany({
      select: {
        name: true,
        description: true,
        category: { select: { name: true, description: true } },
        average_duration: true,
        price: true,
        status: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.service.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
        category: { select: { name: true, description: true } },
        average_duration: true,
        price: true,
        status: true,
      },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    // const existingService = await this.prismaService.service.findUnique({
    //   where: { name: updateServiceDto.name },
    // }); // bu so'rovni kuchaytirish kerak. misol uchun shu kabi so'zni o'z ichiga oladimi yo'qmi.

    // if (existingService) {
    //   throw new ConflictException("Service with this name already exists");
    // }

    const updated_service = await this.prismaService.service.update({
      where: { id },
      data: { ...updateServiceDto },
    });
    return updated_service;
  }

  async remove(id: number) {
    const existingService = await this.prismaService.service.findUnique({
      where: { id },
    });
    if (!existingService) {
      throw new NotFoundException("Service not found");
    }
    return this.prismaService.service.delete({ where: { id } });
  }
}
