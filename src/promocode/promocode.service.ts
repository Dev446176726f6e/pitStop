import { ConflictException, Injectable } from "@nestjs/common";
import { CreatePromocodeDto } from "./dto/create-promocode.dto";
import { UpdatePromocodeDto } from "./dto/update-promocode.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PromocodeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPromocodeDto: CreatePromocodeDto) {
    const existingCode = await this.prismaService.promocode.findUnique({
      where: { code: createPromocodeDto.code },
    });
    if (existingCode) {
      throw new ConflictException(
        "Promocode with this code was created before"
      );
    }

    const new_promocode = await this.prismaService.promocode.create({
      data: { ...createPromocodeDto },
    });
    return new_promocode;
  }

  findAll() {
    return this.prismaService.promocode.findMany();
  }

  findOne(id: number) {
    return this.prismaService.promocode.findUnique({ where: { id } });
  }

  update(id: number, updatePromocodeDto: UpdatePromocodeDto) {
    return this.prismaService.promocode.update({
      where: { id },
      data: { ...updatePromocodeDto },
    });
  }

  remove(id: number) {
    return this.prismaService.promocode.delete({ where: { id } });
  }
}
