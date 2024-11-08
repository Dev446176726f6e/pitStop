import { IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";

export class CreatePaymentDto {
  @IsInt({ message: "Client ID must be an integer." })
  client_id: number;

  @IsOptional()
  @IsNumber({}, { message: "Amount must be a number." })
  @Min(0, { message: "Amount must be a positive value." })
  amount: number;

  @IsString({ message: "Promocode must be a string." })
  @IsOptional()
  promocode?: string;

  // discount will be applied later.

  @IsOptional()
  @IsNumber({}, { message: "Fee must be a number." })
  @Min(0, { message: "Fee must be a positive value." })
  fee: number;

  @IsOptional()
  @IsNumber({}, { message: "Total amount must be a number." })
  @Transform(({ obj }) => obj.amount + (obj.fee ?? 0), { toClassOnly: true })
  total_amount: number;
}
