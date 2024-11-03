import {
  Controller,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthGuard } from 'src/modules/auth/auth.guard';

import { SoftDeleteLinkRequestDTO } from './soft-delete-link.dto';
import { SoftDeleteLinkService } from './soft-delete-link.service';

@Controller('/links')
export class SoftDeleteLinkController {
  constructor(private readonly softDeleteLinkService: SoftDeleteLinkService) {}

  @Delete(':shortCode')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDeleteLink(
    @Param('shortCode') shortCode: unknown,
    @Req() request: Request,
  ) {
    const userId = request.user?.id || null;

    const parsedRequest = new SoftDeleteLinkRequestDTO({
      userId,
      shortCode,
    });

    await this.softDeleteLinkService.remove(parsedRequest.getAll());

    return;
  }
}
