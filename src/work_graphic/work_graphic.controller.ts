import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { WorkGraphicService } from "./work_graphic.service";
import { CreateWorkGraphicsDto } from "./dto/create-work_graphic.dto";
import { UpdateWorkGraphicsDto } from "./dto/update-work_graphic.dto";

@Controller("work-graphic")
export class WorkGraphicController {
  constructor(private readonly workGraphicService: WorkGraphicService) {}

  @Post()
  create(@Body() createWorkGraphicDto: CreateWorkGraphicsDto) {
    return this.workGraphicService.createWorkGraphic(createWorkGraphicDto);
  }

  @Get()
  findAll() {
    return this.workGraphicService.findAllWorkGrahics();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workGraphicService.findOneWorkGraphic(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkGraphicDto: UpdateWorkGraphicsDto
  ) {
    return this.workGraphicService.updateWorkGraphic(+id, updateWorkGraphicDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workGraphicService.removeWorkGraphic(+id);
  }
}
