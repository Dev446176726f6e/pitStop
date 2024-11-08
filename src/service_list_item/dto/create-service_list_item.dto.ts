import { IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";

export class CreateServiceListItemDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "ID must be valid number." }
  )
  @IsNotEmpty({ message: "Server list ID must be provided." })
  @IsPositive({ message: "ID cannot be negative." })
  service_list_id: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "ID must be valid number." }
  )
  @IsNotEmpty({ message: "Server ID must be provided." })
  @IsPositive({ message: "ID cannot be negative." })
  service_id: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Quantity must be valid number." }
  )
  @IsNotEmpty({ message: "Quantity must be provided." })
  @IsPositive({ message: "Quantity cannot be negative." })
  @Min(1, { message: "Minimum amount of given service is 1" })
  quantity: number;
}
