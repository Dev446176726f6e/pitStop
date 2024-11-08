import { IsString, IsOptional, MaxLength, IsInt } from "class-validator";

export class CreateResourceCategoryDto {
  @IsString({ message: "Name must be a string." })
  @MaxLength(100, { message: "Name cannot exceed 100 characters." })
  name: string;

  @IsOptional()
  @IsString({ message: "Description must be a string." })
  description?: string;

  @IsOptional()
  @IsInt({ message: "Parent category ID must be an integer." })
  parent_category_id?: number;
}
