import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.prismaService.role.findUnique({
      where: { name: createRoleDto.name },
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

    const new_role = await this.prismaService.role.create({
      data: { ...createRoleDto },
    });
    return new_role;
  }

  findAll() {
    return this.prismaService.role.findMany();
  }

  findOne(id: number) {
    return this.prismaService.role.findUnique({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updated_role = await this.prismaService.role.update({
      where: { id },
      data: { ...updateRoleDto },
    });
    return updated_role;
  }

  remove(id: number) {
    return this.prismaService.role.delete({ where: { id } });
  }
}
