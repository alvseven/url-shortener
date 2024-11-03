import { Module } from '@nestjs/common';

import { GenerateLinkController } from './generate-link/generate-link.controller';
import { GenerateLinkService } from './generate-link/generate-link.service';
import { RedirectController } from './redirect/redirect.controller';
import { RedirectService } from './redirect/redirect.service';
import { GetUserLinksController } from './get-user-links/get-user-links.controller';
import { GetUserLinksService } from './get-user-links/get-user-links.service';
import { PrismaLinksRepository } from './repositories/links.repository';
import { PrismaUsersRepository } from './repositories/users.repository';

@Module({
  controllers: [
    GenerateLinkController,
    RedirectController,
    GetUserLinksController,
  ],
  providers: [
    GenerateLinkService,
    RedirectService,
    GetUserLinksService,
    PrismaLinksRepository,
    PrismaUsersRepository,
  ],
})
export class LinkModule {}
