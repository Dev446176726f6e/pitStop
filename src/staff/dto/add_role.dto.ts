import { IsInt, IsPositive, IsString, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class AddRoleDto {
  @IsInt({ message: "The staff ID must be an integer." })
  @IsPositive({ message: "The staff ID must be a positive number." })
  @IsNotEmpty({ message: "ID cannot be empty." })
  user_id: number;

  @IsString({ message: "The role must be a string." })
  @IsNotEmpty({ message: "The role cannot be empty." })
  @Transform(({ value }) => value.toUpperCase())
  role: string;
}
