import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(@Payload() registerDto: RegisterUserDto) {
    console.log(registerDto);
    return await this.authService.register(registerDto);
  }

  @MessagePattern('auth.login')
  async login(@Payload() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }

  @MessagePattern('verify.token')
  async verifyToken(@Payload() token: string) {
    return await this.authService.verifyToken(token);
  }
}
