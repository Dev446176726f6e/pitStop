import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { PrismaService } from "../prisma/prisma.service";

import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

import { JwtService } from "@nestjs/jwt";
import { Staff } from "@prisma/client";
import { JwtStaffPaylod } from "../common/types/jwt.staff.payload.type";
import { Response } from "express";
import { AddRoleDto } from "./dto/add_role.dto";
import { WorkGraphicService } from "../work_graphic/work_graphic.service";
import { CreateWorkGraphicsDto } from "../work_graphic/dto/create-work_graphic.dto";
import { CreateStaffWithWorkGraphicDto } from "./dto/create-staff_with_work_graphic.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StaffSignInDto } from "./dto/signin-staff.dto";
import { MailService } from "../common/mail/mail.service";

@Injectable()
export class StaffService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly workService: WorkGraphicService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(staff: Staff) {
    const payload: JwtStaffPaylod = {
      id: staff.id,
      full_name: staff.fullname,
      username: staff.username,
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

  async updateRefreshToken(staff_id: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 10);
    await this.prismaService.staff.update({
      where: { id: staff_id },
      data: { token: hashed_refresh_token },
    });
  }

  async register(
    createStaffWithWorkGraphicDto: CreateStaffWithWorkGraphicDto,
    res: Response
  ) {
    const { username, password, confirm_password, department_id, role_id } =
      createStaffWithWorkGraphicDto;

    if (password !== confirm_password) {
      throw new BadRequestException(
        "Password and confirm-password must match."
      );
    }

    const existingStaff = await this.prismaService.staff.findUnique({
      where: { username },
    });
    if (existingStaff) {
      throw new BadRequestException("Username already in use");
    }

    const existingDepartment = await this.prismaService.department.findUnique({
      where: { id: department_id },
    });
    if (!existingDepartment) {
      throw new BadRequestException("Department not found.");
    }

    const role = await this.prismaService.role_S.findUnique({
      where: { id: role_id },
    });
    if (!role) {
      throw new NotFoundException("Role not found.");
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const activation_link = uuid.v4();

    const new_staff = await this.prismaService.staff.create({
      data: {
        fullname: createStaffWithWorkGraphicDto.fullname,
        username,
        hashed_password,
        activation_link: activation_link,
        phone_number: createStaffWithWorkGraphicDto.phone_number,
        employement_date: createStaffWithWorkGraphicDto.employement_date,
        role_id: createStaffWithWorkGraphicDto.role_id,
        department: {
          connect: { id: department_id },
        },
        roles: {
          create: [{ role_id: role.id }],
        },
      },
    });

    try {
      await this.mailService.sendStaffConfirmationMail(new_staff);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      throw new InternalServerErrorException(
        "There was an issue while sending the confirmation email."
      );
    }

    // const createWorkGraphicDto = new CreateWorkGraphicsDto();
    // createWorkGraphicDto.default_start_time =
    //   createStaffWithWorkGraphicDto.default_start_time;
    // createWorkGraphicDto.default_end_time =
    //   createStaffWithWorkGraphicDto.default_end_time;
    // createWorkGraphicDto.work_days = createStaffWithWorkGraphicDto.work_days;
    // createWorkGraphicDto.work_time = createStaffWithWorkGraphicDto.work_time;

    const createWorkGraphicDto = new CreateWorkGraphicsDto({
      default_start_time: createStaffWithWorkGraphicDto.default_start_time,
      default_end_time: createStaffWithWorkGraphicDto.default_end_time,
      work_days: createStaffWithWorkGraphicDto.work_days,
      work_time: createStaffWithWorkGraphicDto.work_time,
    });

    const work_graphic_id = await this.createWorkGraphic(createWorkGraphicDto);

    const updated_staff = await this.prismaService.staff.update({
      where: { id: new_staff.id },
      data: { work_scheduele_id: work_graphic_id },
    });

    const tokens = await this.generateTokens(updated_staff);
    await this.updateRefreshToken(updated_staff.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME_MS,
    });

    return {
      message: "New staff registered successfully!",
      updated_staff,
    };
  }

  async createWorkGraphic(createWorkGraphicDto: CreateWorkGraphicsDto) {
    const work_graphic =
      await this.workService.createWorkGraphic(createWorkGraphicDto);

    return work_graphic.id;
  }

  async signIn(staffSignInDto: StaffSignInDto, res: Response) {
    const staff = await this.prismaService.staff.findUnique({
      where: { username: staffSignInDto.username },
    });
    if (!staff) {
      throw new UnauthorizedException("Staff not found");
    }

    // if (!staff.is_active) {
    //   throw new BadRequestException("Staff is not active");
    // }

    const valid_password = bcrypt.compareSync(
      staffSignInDto.password,
      staff.hashed_password
    );

    if (!valid_password) {
      throw new BadRequestException("Wrong password");
    }
    const tokens = await this.generateTokens(staff);
    await this.updateRefreshToken(staff.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME_MS,
    });

    return {
      message: "Staff successfully signed in",
      id: staff.id,
      access_token: tokens.access_token,
    };
  }

  async activateStaff(link: string) {
    const staffMember = await this.prismaService.staff.findFirst({
      where: { activation_link: link, is_active: false },
    });

    if (!staffMember) {
      throw new BadRequestException("Staff member not found or already active");
    }

    const updatedStaff = await this.prismaService.staff.update({
      where: { id: staffMember.id },
      data: {
        is_active: true,
        status: "ACTIVE",
      },
    });

    return updatedStaff;
  }

  async signOut(staff_id: number, res: Response) {
    const staff = await this.prismaService.staff.updateMany({
      where: { id: staff_id, token: { not: null } },
      data: { token: null },
    });

    if (!staff) {
      throw new ForbiddenException("Access denied");
    }
    res.clearCookie("refresh_token");
    return true; //{ message: "Employee signed out successfully" };
  }

  async refreshToken(staff_id: number, refresh_token: string, res: Response) {
    const staff = await this.prismaService.staff.findUnique({
      where: { id: staff_id },
    });

    if (!staff || !staff.token) {
      throw new ForbiddenException("Access denied");
    }

    const token_check = await bcrypt.compare(refresh_token, staff.token);

    if (!token_check) {
      throw new ForbiddenException("Access forbidden ");
    }

    const tokens = await this.generateTokens(staff);
    await this.updateRefreshToken(staff_id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME_MS,
      httpOnly: true,
    });

    return {
      message: "Employee tokens refreshed",
      id: staff_id,
      access_token: tokens.access_token,
    };
  }

  findAll() {
    return this.prismaService.staff.findMany({
      where: { is_active: true, is_deleted: false },
      select: {
        id: true,
        fullname: true,
        username: true,
        phone_number: true,
        is_active: true,
        department: { select: { name: true } },
        roles: { select: { role: { select: { name: true } } } },
        work_scheduele: {
          select: {
            default_start_time: true,
            default_end_time: true,
            work_days: true,
          },
        },
        employement_date: true,
        status: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.staff.findUnique({
      where: { id, is_active: true, is_deleted: false },
      // where: { id },
      select: {
        id: true,
        fullname: true,
        username: true,
        phone_number: true,
        is_active: true,
        department: { select: { name: true } },
        roles: { select: { role: { select: { name: true } } } },
        work_scheduele: {
          select: {
            default_start_time: true,
            default_end_time: true,
            work_days: true,
          },
        },
        employement_date: true,
        status: true,
      },
    });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const existingStaff = await this.prismaService.staff.findUnique({
      where: { id },
    });

    if (!existingStaff) {
      throw new NotFoundException("Staff member not found");
    }

    if (
      updateStaffDto.username &&
      updateStaffDto.username !== existingStaff.username
    ) {
      const takenUsername = await this.prismaService.staff.findUnique({
        where: { username: updateStaffDto.username },
      });

      if (takenUsername) {
        throw new ConflictException(
          "This username is already taken. Try another"
        );
      }
    }

    const updated_staff = await this.prismaService.staff.update({
      where: { id },
      data: { ...updateStaffDto },
    });

    return updated_staff;
  }

  async softDeleteStaff(id: number) {
    const deleted_staff = await this.prismaService.staff.update({
      where: { id },
      data: { is_deleted: true },
    });

    return {
      message: "Staff member marked as deleted",
      deleted_staff,
    };
  }

  async addRole(addRoleDto: AddRoleDto) {
    const { user_id, role } = addRoleDto;

    const existingRole = await this.prismaService.role_S.findUnique({
      where: { name: role },
    });

    const existingStaff = await this.prismaService.staff.findUnique({
      where: { id: user_id },
    });

    if (!existingRole) {
      throw new NotFoundException("Role does not exist");
    }

    if (!existingStaff) {
      throw new NotFoundException("Staff member not found");
    }

    const existingStaffRole = await this.prismaService.staff_Role.findFirst({
      where: { staff_id: user_id, role_id: existingRole.id },
    });

    if (existingStaffRole) {
      throw new ConflictException("Staff already has this role assigned");
    }

    return await this.prismaService.staff_Role.create({
      data: {
        staff_id: existingStaff.id,
        role_id: existingRole.id,
      },
    });
  }

  async remove(id: number) {
    const staff = await this.prismaService.staff.findUnique({
      where: { id },
    });

    if (!staff) {
      throw new NotFoundException("Staff member not found");
    }

    await this.prismaService.staff.delete({
      where: { id },
    });

    return { message: "Staff member removed successfully" };
  }
}
