import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateResourceTypeDto } from "./dto/create-resource_type.dto";
import { UpdateResourceTypeDto } from "./dto/update-resource_type.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ResourceTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createResourceTypeDto: CreateResourceTypeDto) {
    const existingResourceName =
      await this.prismaService.resource_Type.findUnique({
        where: { name: createResourceTypeDto.name },
      });

    if (existingResourceName) {
      throw new BadRequestException("Resource category with this name exists.");
    }

    const new_type = await this.prismaService.resource_Type.create({
      data: { ...createResourceTypeDto },
    });
    return new_type;
  }

  findAll() {
    return this.prismaService.resource_Type.findMany();
  }

  findOne(id: number) {
    return this.prismaService.resource_Type.findUnique({ where: { id } });
  }

  async update(id: number, updateResourceTypeDto: UpdateResourceTypeDto) {
    const existingResourceName =
      await this.prismaService.resource_Type.findUnique({
        where: { name: updateResourceTypeDto.name },
      });

    if (existingResourceName) {
      throw new BadRequestException("Resource category with this name exists.");
    }
    return this.prismaService.resource_Type.update({
      where: { id },
      data: { ...updateResourceTypeDto },
    });
  }

  remove(id: number) {
    return this.prismaService.resource_Type.delete({ where: { id } });
  }
}
