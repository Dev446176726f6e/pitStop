import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    // const existingClient = await this.prismaService.client.findUnique({
    //   where: { id: createPaymentDto.client_id },
    // });

    // if (!existingClient) {
    //   throw new NotFoundException("Client not found");
    // }

    const new_payment = await this.prismaService.payment.create({
      data: { ...createPaymentDto },
    });

    return new_payment;
  }

  findAllPayments() {
    return this.prismaService.payment.findMany();
  }

  findOnePayment(id: number) {
    return this.prismaService.payment.findUnique({ where: { id } });
  }

  updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaService.payment.update({
      where: { id },
      data: { ...updatePaymentDto },
    });
  }

  removePayment(id: number) {
    return this.prismaService.payment.delete({ where: { id } });
  }
}
