import { Controller, Get, HttpStatus, Param, Redirect } from '@nestjs/common';

import { RedirectService } from './redirect.service';
import { RedirectRequestDTO } from './redirect.dto';

@Controller('/links')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':shortCode')
  @Redirect(undefined, HttpStatus.FOUND)
  async redirectToOriginalUrl(@Param('shortCode') shortCode: unknown) {
    const parsedRequest = new RedirectRequestDTO({ shortCode });

    const originalUrl = await this.redirectService.getOriginalUrl(
      parsedRequest.get('shortCode'),
    );

    return { url: originalUrl };
  }
}
