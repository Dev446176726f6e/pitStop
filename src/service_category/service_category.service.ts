import { Injectable } from "@nestjs/common";
import { CreateServiceCategoryDto } from "./dto/create-service_category.dto";
import { UpdateServiceCategoryDto } from "./dto/update-service_category.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ServiceCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createServiceCategoryDto: CreateServiceCategoryDto) {
    const new_service_cat = await this.prismaService.service_Category.create({
      data: { ...createServiceCategoryDto },
    });
    return new_service_cat;
  }

  findAll() {
    return this.prismaService.service_Category.findMany();
  }

  findOne(id: number) {
    return this.prismaService.service_Category.findUnique({ where: { id } });
  }

  async update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    const updated_service_cat =
      await this.prismaService.service_Category.update({
        where: { id },
        data: { ...updateServiceCategoryDto },
      });
    return updated_service_cat;
  }

  remove(id: number) {
    // ! where should i add is_deleted. to.
    return this.prismaService.service_Category.delete({ where: { id } });
  }
}
