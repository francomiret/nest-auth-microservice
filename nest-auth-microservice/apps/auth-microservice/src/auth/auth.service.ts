import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterUserDto) {
    return registerDto;
  }

  async login(loginDto: LoginUserDto) {
    return loginDto;
  }

  async verifyToken(token: string) {
    return token;
  }
}
