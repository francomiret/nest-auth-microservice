import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  register(registerDto: RegisterUserDto) {
    return this.natsClient.send('auth.register', registerDto).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  login(loginDto: LoginUserDto) {
    return this.natsClient.send('auth.login', loginDto).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }
}
