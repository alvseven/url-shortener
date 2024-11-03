import { Module } from '@nestjs/common';

import { GenerateLinkController } from './generate-link/generate-link.controller';
import { GenerateLinkService } from './generate-link/generate-link.service';
import { RedirectController } from './redirect/redirect.controller';
import { RedirectService } from './redirect/redirect.service';
import { PrismaLinksRepository } from './repositories/links.repository';

@Module({
  controllers: [GenerateLinkController, RedirectController],
  providers: [GenerateLinkService, RedirectService, PrismaLinksRepository],
})
export class LinkModule {}
