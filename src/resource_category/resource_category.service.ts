import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateResourceCategoryDto } from "./dto/create-resource_category.dto";
import { UpdateResourceCategoryDto } from "./dto/update-resource_category.dto";
import { PrismaService } from "../prisma/prisma.service";
import { publicDecrypt } from "crypto";

@Injectable()
export class ResourceCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createResourceCategoryDto: CreateResourceCategoryDto) {
    const existingParentCategory =
      await this.prismaService.resource_Category.findUnique({
        where: { id: createResourceCategoryDto.parent_category_id },
      });

    if (!existingParentCategory) {
      throw new NotFoundException("Parent category not found");
    }

    return this.prismaService.resource_Category.create({
      data: { ...createResourceCategoryDto },
    });
  }

  findAll() {
    return this.prismaService.resource_Category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        resources: {},
        subcategory: {},
        parentCategory: {},
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.resource_Category.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateResourceCategoryDto: UpdateResourceCategoryDto
  ) {
    const existingParentCategory =
      await this.prismaService.resource_Category.findUnique({
        where: { id: updateResourceCategoryDto.parent_category_id },
      });

    if (!existingParentCategory) {
      throw new NotFoundException("Parent category not found");
    }

    return this.prismaService.resource_Category.update({
      where: { id },
      data: { ...updateResourceCategoryDto },
    });
  }

  remove(id: number) {
    return this.prismaService.resource_Category.delete({ where: { id } });
  }
}
