import { Appointment_Status } from "@prisma/client";
import { IsInt, IsOptional, IsEnum } from "class-validator"; // Assuming you have an enum defined

export class CreateAppointmentDto {
  @IsInt({ message: "Client ID must be an integer." })
  client_id: number;

  @IsOptional()
  @IsInt({ message: "Car ID must be an integer." })
  car_id?: number;

  @IsOptional()
  @IsInt({ message: "Service List ID must be an integer." })
  service_list_id?: number;

  @IsOptional()
  @IsInt({ message: "Basket ID must be an integer." })
  basket_id?: number;

  @IsOptional()
  @IsInt({ message: "Payment ID must be an integer." })
  payment_id?: number;

  @IsOptional()
  @IsEnum(Appointment_Status, { message: "Invalid status." })
  status?: Appointment_Status;
}
