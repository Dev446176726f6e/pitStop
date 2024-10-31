import { PartialType } from "@nestjs/mapped-types";
import { CreateServiceCenterDto } from "./create-service_center.dto";

export class UpdateServiceCenterDto extends PartialType(
  CreateServiceCenterDto
) {}
