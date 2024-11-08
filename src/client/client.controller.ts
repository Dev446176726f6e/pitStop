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
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Response } from "express";
import { ClientSignInDto } from "../admin/dto/signin-admin.dto";
import { SelfClientGuard } from "../guards/self-client.guard";
import { AdminGuard } from "../guards/admin.guard";

@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.signUp(createClientDto, res);
  }

  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.clientService.activateClient(link);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(
    @Body() clientSignInDto: ClientSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.signIn(clientSignInDto, res);
  }

  // @UseGuards(SelfClientGuard) // is there need to add guard to signout
  @Post("signout/:id")
  async signout(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.signOut(+id, res);
  }

  @UseGuards(SelfClientGuard)
  @HttpCode(200)
  @Post(":id/refresh")
  refreshToken(
    @Param("id") id: number,
    @Res({ passthrough: true }) res: Response,
    @Body() body: Record<string, string>
  ) {
    return this.clientService.refreshToken(+id, body.refresh_token, res);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @UseGuards(SelfClientGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(+id);
  }

  @UseGuards(SelfClientGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientService.remove(+id);
  }
}
