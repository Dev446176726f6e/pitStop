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
} from "class-validator";
import { DiscountType } from "@prisma/client";
import { Transform } from "class-transformer";

export class UpdatePromocodeDto {
  @ApiProperty({
    description:
      "Unique code for the promocode (optional, but must be unique if provided)",
    example: "SUMMER22",
    required: false,
  })
  @IsString({ message: "Code must be a string." })
  @IsOptional()
  @IsNotEmpty({ message: "Code is required." })
  @Transform(({ value }) => value.toUpperCase())
  code?: string;

  @ApiProperty({
    description: "Description of the promocode (optional)",
    example: "Summer Sale 2022 Discount",
    required: false,
  })
  @IsString({ message: "Description must be a string." })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Discount percentage or value of the promocode (optional)",
    example: 20,
    required: false,
  })
  @IsPositive({ message: "Discount must be a positive number." })
  @IsOptional()
  discount?: number;

  @ApiProperty({
    description: "The type of discount (e.g., percentage or flat) (optional)",
    enum: DiscountType,
    required: false,
  })
  @IsEnum(DiscountType, { message: "Invalid discount type." })
  @IsOptional()
  type?: DiscountType;

  @ApiProperty({
    description: "The start date of the promocode validity (optional)",
    example: "2024-11-01T00:00:00.000Z",
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  valid_from?: string;

  @ApiProperty({
    description: "The end date of the promocode validity (optional)",
    example: "2024-12-01T00:00:00.000Z",
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  valid_until?: string;

  @ApiProperty({
    description:
      "Usage limit of the promocode (how many times it can be used) (optional)",
    example: 100,
    required: false,
  })
  @IsInt({ message: "Usage limit must be an integer." })
  @Min(1, { message: "Usage limit must be at least 1." })
  @IsOptional()
  usage_limit?: number;

  //   @ApiProperty({
  //     description: "The number of times the promocode has been used (optional)",
  //     example: 10,
  //     default: 0,
  //     required: false,
  //   })
  //   @IsInt({ message: "Used count must be an integer." })
  //   @Min(0, { message: "Used count cannot be negative." })
  //   @IsOptional() // Make used_count optional in the update
  //   used_count?: number;

  //   @ApiProperty({
  //     description: "Whether the promocode is active or not (optional)",
  //     example: true,
  //     default: true,
  //     required: false,
  //   })
  //   @IsBoolean({ message: "Is active must be a boolean." })
  //   @IsOptional()
  //   is_active?: boolean;
}
