import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateRole_sDto {
  @IsString()
  @MinLength(1, { message: "Minimum length of the role name is 1" })
  @MaxLength(50, { message: "Role name length cannot exceed 100" })
  @IsNotEmpty({ message: "Name of role cannot be empty" })
  @Transform(({ value }) =>
    typeof value === "string" ? value.toUpperCase().trim() : value
  )
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: "Description cannot be empty" })
  @MaxLength(300, { message: "Description length cannot exceed 300" })
  description: string;
}
