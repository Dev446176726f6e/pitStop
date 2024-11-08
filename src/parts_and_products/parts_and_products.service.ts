import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePartsAndProductsDto } from "./dto/create-parts_and_product.dto";
import { UpdatePartsAndProductsDto } from "./dto/update-parts_and_product.dto";

@Injectable()
export class PartsAndProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPartsAndProductDto: CreatePartsAndProductsDto) {
    const { resource_type_id, category_id } = createPartsAndProductDto;

    const existingResourceType =
      await this.prismaService.resource_Type.findUnique({
        where: { id: resource_type_id },
      });

    const existingResourceCat =
      await this.prismaService.resource_Category.findUnique({
        where: { id: category_id },
      });

    if (!existingResourceCat || !existingResourceType) {
      throw new NotFoundException("Category or type not found");
    }

    // if (!existingResourceCat) {
    //   throw new NotFoundException("Category not found.");
    // }

    // if (!existingResourceType) {
    //   throw new NotFoundException("Type not found.");
    // }

    const new_partsProduct = this.prismaService.partsAndProducts.create({
      data: { ...createPartsAndProductDto },
    });
    return new_partsProduct;
  }

  findAll() {
    return this.prismaService.partsAndProducts.findMany();
  }

  findOne(id: number) {
    return this.prismaService.partsAndProducts.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updatePartsAndProductDto: UpdatePartsAndProductsDto
  ) {
    const { resource_type_id, category_id } = updatePartsAndProductDto;

    if (resource_type_id) {
      const existingResourceType =
        await this.prismaService.resource_Type.findUnique({
          where: { id: resource_type_id },
        });

      if (!existingResourceType) {
        throw new NotFoundException("Type not found");
      }
    }

    if (category_id) {
      const existingResourceCategory =
        await this.prismaService.resource_Category.findUnique({
          where: { id: category_id },
        });

      if (!existingResourceCategory) {
        throw new NotFoundException("Category not found");
      }
    }
    return this.prismaService.partsAndProducts.update({
      where: { id },
      data: { ...updatePartsAndProductDto },
    });
  }

  remove(id: number) {
    return this.prismaService.partsAndProducts.delete({ where: { id } });
  }
}
