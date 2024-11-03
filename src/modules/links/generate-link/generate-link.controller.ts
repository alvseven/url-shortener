import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { RequireAuth } from 'src/modules/auth/decorators/require-auth.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';

import { GenerateLinkService } from './generate-link.service';
import { GenerateLinkRequestDTO } from './generate-link.dto';

@Controller('/links')
export class GenerateLinkController {
  constructor(private readonly generateLinkService: GenerateLinkService) {}

  @Post()
  @RequireAuth(false)
  @UseGuards(AuthGuard)
  async create(@Req() request: Request) {
    const userId = request?.user?.id || null;

    const parsedRequest = new GenerateLinkRequestDTO({
      ...request.body,
      userId,
    });

    const generatedLink = await this.generateLinkService.generateLink(
      parsedRequest.getAll(),
    );

    return generatedLink;
  }
}
