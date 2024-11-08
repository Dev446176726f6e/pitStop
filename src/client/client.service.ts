import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Client } from "@prisma/client";
import { JwtClientPayload } from "../common/types/jwt.client.payload.type";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { Response } from "express";

import * as uuid from "uuid";
import * as bcrypt from "bcrypt";

import { MailService } from "../common/mail/mail.service";
import { ClientSignInDto } from "../admin/dto/signin-admin.dto";

@Injectable()
export class ClientService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(client: Client) {
    const payload: JwtClientPayload = {
      id: client.id,
      email: client.email,
      phone_number: client.phone_number,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async updateRefreshToken(client_id: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 10);
    await this.prismaService.client.update({
      where: { id: client_id },
      data: { token: hashed_refresh_token },
    });
  }

  async signUp(createClientDto: CreateClientDto, res: Response) {
    const { email, phone_number, password, confirm_password } = createClientDto;
    const existingClient = await this.prismaService.client.findFirst({
      where: { OR: [{ email }, { phone_number }] },
    });

    if (existingClient) {
      throw new BadRequestException("Email or phone number already in use");
    }

    if (password !== confirm_password) {
      throw new BadRequestException(
        "Password and confirm-password must match."
      );
    }

    const hashed_password = await hash(createClientDto.password, 10);
    const activation_link = uuid.v4();

    const new_client = await this.prismaService.client.create({
      data: {
        first_name: createClientDto.first_name,
        last_name: createClientDto.last_name,
        phone_number,
        email,
        hashed_password,
        activation_link,
      },
    });

    try {
      await this.mailService.sendClientConfirmationMail(new_client);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      throw new InternalServerErrorException(
        "There was an issue while sending the confirmation email."
      );
    }

    const tokens = await this.generateTokens(new_client);
    await this.updateRefreshToken(new_client.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME_MS,
    });

    return { message: "New client registered successfully", new_client };
  }

  async activateClient(link: string) {
    const client = await this.prismaService.client.findFirst({
      where: { activation_link: link, status: "PENDING" },
    });

    if (!client) {
      throw new BadRequestException("Client not found or already active");
    }

    const updatedStaff = await this.prismaService.client.update({
      where: { id: client.id },
      data: {
        status: "ACTIVE",
      },
    });

    return updatedStaff;
  }

  async signIn(clientSignInDto: ClientSignInDto, res: Response) {
    const client = await this.prismaService.client.findFirst({
      where: { email: clientSignInDto.email },
    });
    if (!client) {
      throw new UnauthorizedException("Client not found");
    }

    if (client.status !== "ACTIVE") {
      throw new BadRequestException("Staff is not active");
    }

    const valid_password = bcrypt.compareSync(
      clientSignInDto.password,
      client.hashed_password
    );

    if (!valid_password) {
      throw new BadRequestException("Wrong password");
    }
    const tokens = await this.generateTokens(client);
    await this.updateRefreshToken(client.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME_MS,
    });

    return {
      message: "Client successfully signed in",
      id: client.id,
      access_token: tokens.access_token,
    };
  }

  async signOut(client_id: number, res: Response) {
    const client = await this.prismaService.client.updateMany({
      where: { id: client_id, token: { not: null } },
      data: { token: null },
    });

    if (!client) {
      throw new ForbiddenException("Access denied");
    }
    res.clearCookie("refresh_token");
    return true; //{ message: "Employee signed out successfully" };
  }

  async refreshToken(client_id: number, refresh_token: string, res: Response) {
    const client = await this.prismaService.client.findUnique({
      where: { id: client_id },
    });

    if (!client || !client.token) {
      throw new ForbiddenException("Access denied");
    }

    const token_check = await bcrypt.compare(refresh_token, client.token);

    if (!token_check) {
      throw new ForbiddenException("Access forbidden ");
    }

    const tokens = await this.generateTokens(client);
    await this.updateRefreshToken(client_id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME_MS,
      httpOnly: true,
    });

    return {
      message: "Client tokens refreshed",
      id: client_id,
      access_token: tokens.access_token,
    };
  }

  findAll() {
    return this.prismaService.client.findMany();
  }

  async findOne(id: number) {
    const is_client = await this.prismaService.client.findUnique({
      where: { id },
    });
    if (!is_client) {
      throw new NotFoundException("Client not found");
    }

    return this.prismaService.client.findUnique({ where: { id } });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.prismaService.client.update({
      where: { id },
      data: { ...updateClientDto },
    });
  }

  remove(id: number) {
    return this.prismaService.client.delete({ where: { id } });
  }
}
