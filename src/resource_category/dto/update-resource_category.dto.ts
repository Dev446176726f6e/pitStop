import { PartialType } from "@nestjs/mapped-types";
import { CreateResourceCategoryDto } from "./create-resource_category.dto";

export class UpdateResourceCategoryDto extends PartialType(
  CreateResourceCategoryDto
) {}
