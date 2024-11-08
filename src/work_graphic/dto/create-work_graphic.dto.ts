import { WorkTime } from "@prisma/client";
import { IsString, IsEnum, IsObject, Validate, Matches } from "class-validator";
import { IsValidWorkDays } from "../../common/validation/work_days.validation";

export class CreateWorkGraphicsDto {
  constructor(data: Partial<CreateWorkGraphicsDto>) {
    Object.assign(this, data);
  }

  @IsString()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Start time must be in HH:MM format",
  })
  default_start_time: string;

  @IsString()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "End time must be in HH:MM format",
  })
  default_end_time: string;

  @IsObject()
  @Validate(IsValidWorkDays)
  work_days: Record<string, boolean>;

  @IsEnum(WorkTime, {
    message: "Work time must be one of FULL_TIME, PART_TIME, or CONTRACT",
  })
  work_time: WorkTime;
}
