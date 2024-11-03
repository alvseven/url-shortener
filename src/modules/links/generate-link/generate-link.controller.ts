import { Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

import { GenerateLinkService } from './generate-link.service';
import { GenerateLinkRequestDTO } from './generate-link.dto';

@Controller('/links')
export class GenerateLinkController {
  constructor(private readonly generateLinkService: GenerateLinkService) {}

  @Post()
  async create(@Req() request: Request) {
    const parsedRequest = new GenerateLinkRequestDTO({ ...request.body });

    const generatedLink = await this.generateLinkService.generateLink(
      parsedRequest.get('url'),
    );

    return generatedLink;
  }
}
