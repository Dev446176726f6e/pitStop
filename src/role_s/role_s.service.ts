import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRole_sDto } from "./dto/create-role_.dto";
import { UpdateRole_sDto } from "./dto/update-role_.dto";

@Injectable()
export class RoleSService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRole_sDto: CreateRole_sDto) {
    const existingRole = await this.prismaService.role_S.findUnique({
      where: { name: createRole_sDto.name },
    });

    if (existingRole) {
      throw new HttpException(
        {
          error: "A role with this name already exists",
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT
      );
    }

    const new_role = await this.prismaService.role_S.create({
      data: { ...createRole_sDto },
    });
    return new_role;
  }

  findAll() {
    return this.prismaService.role_S.findMany();
  }

  findOne(id: number) {
    return this.prismaService.role_S.findUnique({ where: { id } });
  }

  async update(id: number, updateRole_sDto: UpdateRole_sDto) {
    const updated_role = await this.prismaService.role_S.update({
      where: { id },
      data: { ...updateRole_sDto },
    });
    return updated_role;
  }

  remove(id: number) {
    return this.prismaService.role_S.delete({ where: { id } });
  }
}
