import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';
import { SignInRequestDTO } from './auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Req() request: Request) {
    const parsedRequest = new SignInRequestDTO({ ...request.body });

    return this.authService.signIn(parsedRequest.getAll());
  }
}
