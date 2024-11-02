import { Controller, Get, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

import { LinkService } from './generate-link.service';
import { GenerateLinkRequestDTO } from './generate-link.dto';

@Controller('/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(@Req() request: Request) {
    const parsedRequest = new GenerateLinkRequestDTO({ ...request.body });

    const generatedLink = await this.linkService.generateLink(
      parsedRequest.get('url'),
    );

    return generatedLink;
  }

  @Get()
  getBy() {
    return 'Hello, Alves!';
  }
}
