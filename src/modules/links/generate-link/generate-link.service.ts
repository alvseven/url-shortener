import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { GenerateLinkInput } from './generate-link.dto';
import { PrismaLinksRepository } from '../repositories/links.repository';

import { parsedEnvs } from 'src/shared/config/env';

@Injectable()
export class GenerateLinkService {
  constructor(private readonly linksRepository: PrismaLinksRepository) {}

  public async generateLink(url: GenerateLinkInput['url']) {
    const nanoId = nanoid(6);
    const shortUrl = `${parsedEnvs.API_URL}/${nanoId}`;

    await this.linksRepository.save({
      originalUrl: url,
      shortUrl: nanoId,
    });

    return { shortUrl };
  }
}
