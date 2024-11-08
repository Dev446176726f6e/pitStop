import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { Admin } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { JwtAdminPayload } from "../common/types/jwt.admin.payload.type";
import { Response } from "express";
import { AddRoleDto } from "../staff/dto/add_role.dto";
import { AdminSignInDto } from "../client/dto/signin-client.dto";

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload: JwtAdminPayload = {
      id: admin.id,
      email: admin.email,
      username: admin.username,
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

  async updateRefreshToken(admin_id: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 10);
    await this.prismaService.admin.update({
      where: { id: admin_id },
      data: { token: hashed_refresh_token },
    });
  }

  async signUp(createAdminDto: CreateAdminDto, res: Response) {
    const { email, username } = createAdminDto;
    if (!email && !username) {
      throw new BadRequestException(
        "Either username or email must be provided"
      );
    }

    const existingAdmin = await this.prismaService.admin.findFirst({
      where: { OR: [{ username: username }, { email: email }] },
    });

    if (existingAdmin) {
      throw new BadRequestException("Username or email already in use");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException(
        "Password and confirm-password must match."
      );
    }

    const role = await this.prismaService.role.findUnique({
      where: { name: createAdminDto.role },
    });

    if (!role) {
      throw new NotFoundException("Role not found.");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 10);

    const new_admin = await this.prismaService.admin.create({
      data: {
        username: createAdminDto.username,
        email: createAdminDto.email,
        hashed_password: hashed_password,
        roles: {
          create: [{ role_id: role.id }],
        },
      },
    });

    const tokens = await this.generateTokens(new_admin);
    await this.updateRefreshToken(new_admin.id, tokens.refresh_token);
    await this.prismaService.admin.update({
      where: { id: new_admin.id },
      data: { is_active: true },
    });

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME_MS,
    });

    return {
      message: "New admin registered successfully.!",
      new_admin,
    };
  }

  async refreshToken(admin_id: number, refresh_token: string, res: Response) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id: admin_id },
    });

    if (!admin || !admin.token) {
      throw new ForbiddenException("Access denied");
    }

    const token_check = await bcrypt.compare(refresh_token, admin.token);

    if (!token_check) {
      throw new ForbiddenException("Access forbidden ");
    }

    const tokens = await this.generateTokens(admin);
    await this.updateRefreshToken(admin_id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME_MS,
      httpOnly: true,
    });

    return {
      message: "Employee tokens refreshed",
      id: admin_id,
      access_token: tokens.access_token,
    };
  }

  async signIn(adminSignInDto: AdminSignInDto, res: Response) {
    const { username, password } = adminSignInDto;

    const admin = await this.prismaService.admin.findFirst({
      where: {
        OR: [{ username }],
      },
    });

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.hashed_password
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid credentials");
    }

    const tokens = await this.generateTokens(admin);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME_MS,
    });

    return {
      message: "Successfully signed in!",
      token: tokens.access_token,
    };
  }

  async signOut(adminId: number, res: Response) {
    await this.prismaService.admin.update({
      where: { id: adminId },
      data: { token: null },
    });

    res.clearCookie("refresh_token");

    return { message: "Successfully signed out!" };
  }

  findAll() {
    return this.prismaService.admin.findMany({
      where: { is_deleted: false },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
        token: true,
        roles: { select: { role: { select: { name: true } } } },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.admin.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
        token: true,
        roles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.prismaService.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      throw new NotFoundException("Admin not found");
    }

    if (
      updateAdminDto.username &&
      updateAdminDto.username !== existingAdmin.username
    ) {
      const takenUsername = await this.prismaService.admin.findUnique({
        where: { username: updateAdminDto.username },
      });

      if (takenUsername) {
        throw new ConflictException(
          "This username is already taken. Try another"
        );
      }
    }

    const updated_admin = await this.prismaService.admin.update({
      where: { id },
      data: { ...updateAdminDto },
    });

    return updated_admin;
  }

  async softDeleteAdmin(id: number) {
    const deleted_admin = await this.prismaService.admin.update({
      where: { id: id },
      data: { is_deleted: true },
    });
    return deleted_admin;
  }

  // ! Add a role to an admin
  async addRole(addRole: AddRoleDto) {
    const { role, user_id } = addRole;

    if (!role) {
      throw new BadRequestException("Role cannot be empty");
    }

    const existingRole = await this.prismaService.role.findUnique({
      where: { name: role.toUpperCase() },
    });

    const existingAdmin = await this.prismaService.admin.findUnique({
      where: { id: user_id },
    });

    if (!existingRole) {
      throw new NotFoundException("Role does not exist");
    }

    if (!existingAdmin) {
      throw new NotFoundException("Admin not found");
    }

    const existingAdminRole = await this.prismaService.admin_Role.findUnique({
      where: {
        admin_id_role_id: {
          admin_id: user_id,
          role_id: existingRole.id,
        },
      },
    });

    if (existingAdminRole) {
      throw new ConflictException("Admin already has this role assigned");
    }

    return await this.prismaService.admin_Role.create({
      data: {
        admin_id: user_id,
        role_id: existingRole.id,
      },
    });
  }
}
