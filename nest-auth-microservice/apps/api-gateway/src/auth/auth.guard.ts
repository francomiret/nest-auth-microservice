import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.tockenExtractor(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = { token };
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  private tockenExtractor(request: Request): string | undefined {
    const [type, token] =
      request.headers.get('authorization')?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
