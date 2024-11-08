import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized user");
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Unauthorized user");
    }

    return await this.verifyToken(token, req);
  }

  private async verifyToken(token: string, req: any): Promise<boolean> {
    let payload: any;
    try {
      payload = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error.message || "Invalid token");
    }

    if (!payload) {
      throw new UnauthorizedException("Unauthorized user");
    }

    const existingClient = this.prismaService.client.findUnique({
      where: { id: payload.id },
    });

    if (!existingClient) {
      throw new ForbiddenException("Access denied. Client not found");
    }

    if ((await existingClient).status !== "ACTIVE") {
      throw new ForbiddenException(
        "Access denied. Your account is not active."
      );
    }

    req.client = payload;
    return true;
  }
}
