import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
// import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ServiceListService } from "../service_list/service_list.service";
import { ServiceListItemService } from "../service_list_item/service_list_item.service";
import { BasketItemService } from "../basket_item/basket_item.service";
import { BasketService } from "../basket/basket.service";
import { PaymentService } from "../payment/payment.service";
import { CreateBasketDto } from "../basket/dto/create-basket.dto";
import { CreateServiceListDto } from "../service_list/dto/create-service_list.dto";
import { CreatePaymentDto } from "../payment/dto/create-payment.dto";
import { CreateBasketItemDto } from "../basket_item/dto/create-basket_item.dto";
import { CreateServiceListItemDto } from "../service_list_item/dto/create-service_list_item.dto";

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly serviceListService: ServiceListService,
    private readonly serviceListItemService: ServiceListItemService,
    private readonly basketItemService: BasketItemService,
    private readonly basketService: BasketService,
    private readonly paymentService: PaymentService
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const existingClient = await this.prismaService.client.findUnique({
      where: { id: createAppointmentDto.client_id },
    });
    if (!existingClient) {
      throw new NotFoundException("Client not found");
    }

    if (createAppointmentDto.car_id) {
      const existingCar = await this.prismaService.car.findUnique({
        where: { id: createAppointmentDto.car_id },
      });
      if (!existingCar) {
        throw new NotFoundException("Car not found");
      }
    }

    const basket_id = await this.createBasket(new CreateBasketDto());
    const service_list_id = await this.createServiceList(
      new CreateServiceListDto()
    );
    const payment_id = await this.createPayment(new CreatePaymentDto());

    const new_appointment = await this.prismaService.appointment.create({
      data: {
        client_id: createAppointmentDto.client_id,
        car_id: createAppointmentDto.car_id,
        service_list_id,
        basket_id,
        payment_id,
      },
    });

    return new_appointment;
  }

  async createBasket(createBasketDto: CreateBasketDto) {
    const new_basket = await this.basketService.createBasket(createBasketDto);
    if (!new_basket || !new_basket.id) {
      throw new BadRequestException("Failed to create basket");
    }

    return new_basket.id;
  }

  async addBasketItem(createBasketItemDto: CreateBasketItemDto) {
    const new_basket_item =
      await this.basketItemService.createBasketItem(createBasketItemDto);

    return new_basket_item;
  }
  async removeBasketItem() {}

  async createServiceList(createServiceList: CreateServiceListDto) {
    const new_service_list =
      await this.serviceListService.createServiceList(createServiceList);
    if (!new_service_list || !new_service_list.id) {
      throw new Error("Failed to create service list");
    }

    return new_service_list.id;
  }

  async addServiceListItem(createServiceListItem: CreateServiceListItemDto) {
    const new_service_list_item =
      await this.serviceListItemService.createServiceListItem(
        createServiceListItem
      );
  }
  async removeServiceListItem() {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const new_payment =
      await this.paymentService.createPayment(createPaymentDto);
    if (!new_payment || !new_payment.id) {
      throw new Error("Failed to create payment");
    }

    return new_payment.id;
  }

  findAll() {
    return this.prismaService.appointment.findMany();
  }

  findOne(id: number) {
    return this.prismaService.appointment.findUnique({ where: { id } });
  }

  // update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
  //   return `This action updates a #${id} appointment`;
  // }

  remove(id: number) {
    return this.prismaService.appointment.delete({ where: { id } });
  }
}
