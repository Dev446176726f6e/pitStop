import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWorkGraphicsDto } from "./dto/create-work_graphic.dto";
import { UpdateWorkGraphicsDto } from "./dto/update-work_graphic.dto";

@Injectable()
export class WorkGraphicService {
  constructor(private readonly prismaService: PrismaService) {}

  async createWorkGraphic(createWorkGraphicDto: CreateWorkGraphicsDto) {
    const new_work_graphic = await this.prismaService.work_Graphics.create({
      data: { ...createWorkGraphicDto },
    });
    return new_work_graphic;
  }

  findAllWorkGrahics() {
    return this.prismaService.work_Graphics.findMany();
  }

  findOneWorkGraphic(id: number) {
    return this.prismaService.work_Graphics.findUnique({ where: { id } });
  }

  updateWorkGraphic(id: number, updateWorkGraphicDto: UpdateWorkGraphicsDto) {
    return this.prismaService.work_Graphics.update({
      where: { id },
      data: { ...updateWorkGraphicDto },
    });
  }

  removeWorkGraphic(id: number) {
    return this.prismaService.work_Graphics.delete({ where: { id } });
  }
}
