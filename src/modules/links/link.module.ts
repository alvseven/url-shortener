import { Module } from '@nestjs/common';
import { LinkController } from './generate-link/generate-link.controller';
import { LinkService } from './generate-link/generate-link.service';
import { PrismaLinksRepository } from './repositories/links.repository';

@Module({
  controllers: [LinkController],
  providers: [LinkService, PrismaLinksRepository],
})
export class LinkModule {}
