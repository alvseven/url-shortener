import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { AuthGuard } from 'src/modules/auth/auth.guard';

import { GetUserLinksRequestDTO } from './get-user-links.dto';
import { GetUserLinksService } from './get-user-links.service';

@Controller('/links')
export class GetUserLinksController {
  constructor(private readonly getUserLinksService: GetUserLinksService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserLinks(@Req() request: Request) {
    const userId = request?.user?.id || null;

    const parsedRequest = new GetUserLinksRequestDTO({
      userId,
    });

    const userLinks = await this.getUserLinksService.get(
      parsedRequest.get('userId'),
    );

    return userLinks;
  }
}
