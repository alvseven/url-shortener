import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaLinksRepository } from '../repositories/links.repository';

import type { RedirectInput } from './redirect.dto';

@Injectable()
export class RedirectService {
  constructor(private readonly linksRepository: PrismaLinksRepository) {}

  public async getOriginalUrl(shortCode: RedirectInput['shortCode']) {
    const link = await this.linksRepository.findByShortCode(shortCode);

    if (!link) {
      throw new NotFoundException('URL not found');
    }

    return link.originalUrl;
  }
}
