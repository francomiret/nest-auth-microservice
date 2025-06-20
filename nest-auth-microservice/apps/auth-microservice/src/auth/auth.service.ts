import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { config } from '../config';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async register(registerDto: RegisterUserDto) {
    const exist = await this.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });
    if (exist) {
      throw new RpcException({
        code: 400,
        message: 'User already exists',
      });
    }
    const hashedPassword = await bcrypt.hashSync(registerDto.password, 10);
    const user = await this.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });
    return user;
  }

  async login(loginDto: LoginUserDto) {
    return loginDto;
  }

  async verifyToken(token: string) {
    try {
      const {
        sub: _,
        iat: __,
        exp: ___,
        ...user
      } = this.jwtService.verify(token, {
        secret: config.jwtSecret,
      });
      return { user, token: this.signJwt(user) };
    } catch (error) {
      throw new RpcException({
        code: 400,
        message: error.message,
      });
    }
  }

  signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
