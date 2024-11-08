import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BranchService {
  constructor(private readonly prisamService: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    const is_service_center =
      await this.prisamService.service_Center.findUnique({
        where: { id: createBranchDto.service_center_id },
      });
    if (!is_service_center) {
      throw new NotFoundException("Cannot set inexistent service to branch");
    }
    const new_branch = await this.prisamService.branch.create({
      data: { ...createBranchDto },
    });
    return new_branch;
  }

  findAll() {
    return this.prisamService.branch.findMany();
  }

  findOne(id: number) {
    return this.prisamService.branch.findUnique({ where: { id } });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    // ! tartibsiz turli tablelar kelganda. olishi kerakmi.
    const is_branch = await this.prisamService.branch.findUnique({
      where: { id },
    });
    if (!is_branch) {
      throw new NotFoundException("Branch with this ID not found");
    }
    // ! va service_center_id qa qiymat kelsa error yozish.
    const updated_branch = await this.prisamService.branch.update({
      where: { id },
      data: { ...updateBranchDto },
    });
    return updated_branch;
  }

  async remove(id: number) {
    const is_branch = await this.prisamService.branch.findUnique({
      where: { id },
    });
    if (!is_branch) {
      throw new NotFoundException("Branch with this ID not found");
    }
    return this.prisamService.branch.delete({ where: { id } });
  }
}
