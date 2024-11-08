import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsISO8601,
  IsInt,
  IsBoolean,
  IsOptional,
  IsPositive,
  Min,
  Max,
} from "class-validator";
import { DiscountType } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreatePromocodeDto {
  @ApiProperty({
    description: "Unique code for the promocode",
    example: "SUMMER21",
  })
  @IsString({ message: "Code must be a string." })
  @IsNotEmpty({ message: "Code is required." })
  @Transform(({ value }) => value.toUpperCase())
  code: string;

  @ApiProperty({
    description: "Description of the promocode (optional)",
    example: "Summer Sale 2021 Discount",
    required: false,
  })
  @IsString({ message: "Description must be a string." })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Discount percentage or value of the promocode",
    example: 20,
  })
  @IsPositive({ message: "Discount must be a positive number." })
  discount: number;

  @ApiProperty({
    description: "The type of discount (e.g., percentage or flat)",
    enum: DiscountType,
  })
  @IsEnum(DiscountType, { message: "Invalid discount type." })
  type: DiscountType;

  @ApiProperty({
    description: "The start date of the promocode validity",
    example: "2024-11-01T00:00:00.000Z",
  })
  @IsISO8601()
  valid_from: string;

  @ApiProperty({
    description: "The end date of the promocode validity",
    example: "2024-12-01T00:00:00.000Z",
  })
  @IsISO8601()
  valid_until: string;

  @ApiProperty({
    description: "Usage limit of the promocode (how many times it can be used)",
    example: 100,
  })
  @IsInt({ message: "Usage limit must be an integer." })
  @Min(1, { message: "Usage limit must be at least 1." })
  usage_limit: number;

  //   @ApiProperty({
  //     description: "The number of times the promocode has been used",
  //     example: 10,
  //     default: 0,
  //   })
  //   @IsInt({ message: "Used count must be an integer." })
  //   @Min(0, { message: "Used count cannot be negative." })
  //   used_count: number;

  //   @ApiProperty({
  //     description: "Whether the promocode is active or not",
  //     example: true,
  //     default: true,
  //   })
  //   @IsBoolean({ message: "Is active must be a boolean." })
  //   is_active: boolean;
}
