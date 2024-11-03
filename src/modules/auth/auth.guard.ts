import {
  type CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import type { Request } from 'express';
import { parsedEnvs } from 'src/shared/config/env';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const isAuthRequired =
      this.reflector.get<boolean>('isAuthRequired', context.getHandler()) !==
      false;

    if (!token) {
      if (!isAuthRequired) {
        request.user = null;
        return true;
      }

      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: parsedEnvs.JWT_SECRET,
      });

      request.user = { id: payload.sub };
    } catch {
      throw new UnauthorizedException('Token expirado ou inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
