import { Injectable } from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupplierService {
  constructor(private readonly prismService: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const new_supplier = await this.prismService.supplier.create({
      data: { ...createSupplierDto },
    });
    return new_supplier;
  }

  findAll() {
    return this.prismService.supplier.findMany();
  }

  findOne(id: number) {
    return this.prismService.supplier.findUnique({ where: { id } });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const updated_supplier = await this.prismService.supplier.update({
      where: { id },
      data: { ...updateSupplierDto },
    });
    return updated_supplier;
  }

  remove(id: number) {
    return this.prismService.supplier.delete({ where: { id } });
  }
}
