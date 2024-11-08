import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Response } from "express";
import { CreateStaffWithWorkGraphicDto } from "./dto/create-staff_with_work_graphic.dto";
import { AddRoleDto } from "./dto/add_role.dto";
import { StaffSignInDto } from "./dto/signin-staff.dto";
import { HRGuard } from "../guards/hr.guard";
import { SelfStaffGuard } from "../guards/self-staff.guard";
import { AdminGuard } from "../guards/admin.guard";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(HRGuard)
  @Post("register")
  async create(
    @Body() createStaffWithWorkGraphicDto: CreateStaffWithWorkGraphicDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.staffService.register(createStaffWithWorkGraphicDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(
    @Body() staffSignInDto: StaffSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.staffService.signIn(staffSignInDto, res);
  }

  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.staffService.activateStaff(link);
  }

  @Post("signout/:id")
  async signout(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.staffService.signOut(+id, res);
  }

  @UseGuards(SelfStaffGuard)
  @HttpCode(200)
  @Post(":id/refresh")
  refreshToken(
    @Param("id") id: number,
    @Res({ passthrough: true }) res: Response,
    @Body() body: Record<string, string>
  ) {
    return this.staffService.refreshToken(+id, body.refresh_token, res);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @UseGuards(SelfStaffGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @UseGuards(SelfStaffGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.staffService.remove(+id);
  // }

  @UseGuards(HRGuard)
  @Post("add-role/:id")
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.staffService.addRole(addRoleDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  softDelete(@Param("id") id: string) {
    return this.staffService.softDeleteStaff(+id);
  }
}
