import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoleSService } from "./role_s.service";
import { CreateRole_sDto } from "./dto/create-role_.dto";
import { UpdateRole_sDto } from "./dto/update-role_.dto";

@Controller("role-s")
export class RoleSController {
  constructor(private readonly roleSService: RoleSService) {}

  @Post()
  create(@Body() createRole_sDto: CreateRole_sDto) {
    return this.roleSService.create(createRole_sDto);
  }

  @Get()
  findAll() {
    return this.roleSService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleSService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRole_sDto: UpdateRole_sDto) {
    return this.roleSService.update(+id, updateRole_sDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleSService.remove(+id);
  }
}
