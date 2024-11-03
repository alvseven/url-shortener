import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaLinksRepository } from '../repositories/links.repository';

import type { RedirectInput } from './redirect.dto';

@Injectable()
export class RedirectService {
  constructor(private readonly linksRepository: PrismaLinksRepository) {}

  public async getOriginalUrl(shortCode: RedirectInput['shortCode']) {
    const link = await this.linksRepository.findByShortCode(shortCode);

    if (!link) {
      throw new NotFoundException('URL não encontrada');
    }

    const previousClicksCountPlusOne = link.clicks + 1;

    await this.linksRepository.updateClicksCountById(
      link.id,
      previousClicksCountPlusOne,
    );

    return link.originalUrl;
  }
}
