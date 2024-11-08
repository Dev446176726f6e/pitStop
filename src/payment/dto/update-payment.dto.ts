import { PartialType } from "@nestjs/mapped-types";
import { CreatePaymentDto } from "./create-payment.dto";
import { IsOptional, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsNumber({}, { message: "Amount must be a number." })
  amount?: number;

  @IsOptional()
  @IsNumber({}, { message: "Fee must be a number." })
  fee?: number;

  @IsOptional()
  @IsNumber({}, { message: "Total amount must be a number." })
  @Transform(({ obj }) => (obj.amount ?? 0) + (obj.fee ?? 0), {
    toClassOnly: true,
  })
  total_amount?: number;
}
