import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateServiceListDto {
  // @IsNumber(
  //   { allowNaN: false, allowInfinity: false },
  //   { message: "Price must be a valid number." }
  // )
  // @IsNotEmpty({ message: "Price of service must be provided." })
  // @IsPositive({ message: "Price cannot be negative." })
  // total_price: number;
}
