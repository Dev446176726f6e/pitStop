import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCarDto: CreateCarDto) {
    const { VIN, license_plate } = createCarDto;
    if (!VIN && !license_plate) {
      throw new BadRequestException(
        "Either VIN number or license plate must be provided"
      );
    }
    const new_car = await this.prismaService.car.create({
      data: { ...createCarDto },
    });
    return new_car;
  }

  findAll() {
    return this.prismaService.car.findMany({
      select: {
        id: true,
        client: {
          select: {
            first_name: true,
            last_name: true,
            phone_number: true,
            email: true,
          },
        },
        manufacturer: true,
        model: true,
        year: true,
        VIN: true,
        license_plate: true,
        color: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.car.findUnique({
      where: { id },
      select: {
        id: true,
        client: {
          select: {
            first_name: true,
            last_name: true,
            phone_number: true,
            email: true,
          },
        },
        manufacturer: true,
        model: true,
        year: true,
        VIN: true,
        license_plate: true,
        color: true,
      },
    });
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const updated_car = await this.prismaService.car.update({
      where: { id },
      data: { ...updateCarDto },
    });
    return updated_car;
  }

  remove(id: number) {
    return this.prismaService.car.delete({ where: { id } });
  }
}
