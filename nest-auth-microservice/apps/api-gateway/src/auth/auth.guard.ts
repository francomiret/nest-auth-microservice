import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { NATS_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.tockenExtractor(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { user, token: newToken } = await firstValueFrom(
        this.client.send('verify.token', token)
      );
      request['user'] = user;
      request['token'] = newToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private tockenExtractor(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
