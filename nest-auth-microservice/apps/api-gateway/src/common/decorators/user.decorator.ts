import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new InternalServerErrorException('User not found');
    }
    return request.user;
  }
);
