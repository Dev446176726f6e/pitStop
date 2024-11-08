import { PartialType } from "@nestjs/swagger";
import { CreateServiceListItemDto } from "./create-service_list_item.dto";

export class UpdateServiceListItemDto extends PartialType(
  CreateServiceListItemDto
) {}
