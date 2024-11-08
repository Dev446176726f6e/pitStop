import { IsString, IsOptional, MaxLength } from "class-validator";

export class CreateResourceTypeDto {
  @IsString({ message: "Name must be a string." })
  @MaxLength(100, { message: "Name cannot exceed 100 characters." })
  name: string;

  @IsOptional()
  @IsString({ message: "Description must be a string." })
  description?: string;
}
