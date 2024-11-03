import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import type { GenerateLinkInput } from './generate-link.dto';
import { PrismaLinksRepository } from '../repositories/links.repository';
import { parsedEnvs } from 'src/shared/config/env';

@Injectable()
export class GenerateLinkService {
  constructor(private readonly linksRepository: PrismaLinksRepository) {}

  public async generateLink({ url, userId }: GenerateLinkInput) {
    const nanoId = nanoid(6);
    const shortUrl = `${parsedEnvs.API_URL}/links/${nanoId}`;

    await this.linksRepository.save({
      originalUrl: url,
      shortUrl: nanoId,
      userId,
    });

    return { shortUrl };
  }
}
