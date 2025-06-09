import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { config } from '../config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterUserDto) {
    return registerDto;
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
