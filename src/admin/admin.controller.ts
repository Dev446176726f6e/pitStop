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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response } from "express";
import { AddRoleDto } from "../staff/dto/add_role.dto";
import { AdminSignInDto } from "../client/dto/signin-client.dto";
import { CreatorGuard } from "../guards/creator.guard";
import { SelfAdminGuard } from "../guards/self-admin.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(CreatorGuard)
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.signUp(createAdminDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(
    @Body() adminSignInDto: AdminSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.signIn(adminSignInDto, res);
  }

  @Post("signout/:id")
  async signout(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.signOut(+id, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refreshToken(
    @Param("id") id: number,
    @Res({ passthrough: true }) res: Response,
    @Body() body: Record<string, string>
  ) {
    return this.adminService.refreshToken(+id, body.refresh_token, res);
  }

  @UseGuards(CreatorGuard)
  @Post("add-role/:id")
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.adminService.addRole(addRoleDto);
  }

  @UseGuards(CreatorGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(SelfAdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfAdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(":id")
  softDelete(@Param("id") id: string) {
    return this.adminService.softDeleteAdmin(+id);
  }

  // @Post(":id/roles")
  // async addRole(@Param("id") id: number, @Body("role") role: string) {
  //   const updatedAdmin = await this.adminService.addRole(id, role);
  //   return updatedAdmin;
  // }
}
