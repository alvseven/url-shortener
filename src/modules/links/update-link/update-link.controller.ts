import { Controller, Param, Req, UseGuards, Patch } from '@nestjs/common';
import type { Request } from 'express';

import { AuthGuard } from 'src/modules/auth/auth.guard';

import { UpdateLinkRequestDTO } from './update-link.dto';
import { UpdateLinkService } from './update-link.service';

@Controller('/links')
export class UpdateLinkController {
  constructor(private readonly updateLinkService: UpdateLinkService) {}

  @Patch(':shortCode')
  @UseGuards(AuthGuard)
  async updateLink(
    @Param('shortCode') shortCode: unknown,
    @Req() request: Request,
  ) {
    const userId = request.user?.id || null;

    const parsedRequest = new UpdateLinkRequestDTO({
      userId,
      shortCode,
      newUrl: request.body?.newUrl,
    });

    const updatedLink = await this.updateLinkService.update(
      parsedRequest.getAll(),
    );

    return updatedLink;
  }
}
