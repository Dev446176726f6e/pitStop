import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.prismaService.department.create({
      data: { ...createDepartmentDto },
    });
  }

  findAll() {
    return this.prismaService.department.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        staff: {
          select: {
            fullname: true,
            username: true,
            phone_number: true,
            is_active: true,
            roles: { select: { role: { select: { name: true } } } },
            work_scheduele: {
              select: {
                default_start_time: true,
                default_end_time: true,
                work_days: true,
              },
            },
            employement_date: true,
            status: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.department.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        staff: {
          select: {
            fullname: true,
            username: true,
            phone_number: true,
            is_active: true,
            roles: { select: { role: { select: { name: true } } } },
            work_scheduele: {
              select: {
                default_start_time: true,
                default_end_time: true,
                work_days: true,
              },
            },
            employement_date: true,
            status: true,
          },
        },
      },
    });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.prismaService.department.update({
      where: { id },
      data: { ...updateDepartmentDto },
    });
  }

  remove(id: number) {
    return this.prismaService.department.delete({ where: { id } });
  }
}
