import { Module } from '@nestjs/common';

import { GenerateLinkController } from './generate-link/generate-link.controller';
import { GenerateLinkService } from './generate-link/generate-link.service';
import { RedirectController } from './redirect/redirect.controller';
import { RedirectService } from './redirect/redirect.service';
import { GetUserLinksController } from './get-user-links/get-user-links.controller';
import { GetUserLinksService } from './get-user-links/get-user-links.service';
import { PrismaLinksRepository } from './repositories/links.repository';
import { PrismaUsersRepository } from './repositories/users.repository';
import { SoftDeleteLinkController } from './soft-delete-link/soft-delete-link.controller';
import { SoftDeleteLinkService } from './soft-delete-link/soft-delete-link.service';

@Module({
  controllers: [
    GenerateLinkController,
    RedirectController,
    GetUserLinksController,
    SoftDeleteLinkController,
  ],
  providers: [
    GenerateLinkService,
    RedirectService,
    GetUserLinksService,
    SoftDeleteLinkService,
    PrismaLinksRepository,
    PrismaUsersRepository,
  ],
})
export class LinkModule {}
