import type { Link as LinkModel } from '@prisma/client';

import { prisma } from 'src/shared/database/prisma-client';

import { StrictOmit } from 'src/shared/helpers/types/strict-omit';

export class PrismaLinksRepository {
  private repository = prisma.link;

  async save(
    data: Pick<LinkModel, 'originalUrl' | 'shortUrl'>,
    options?: StrictOmit<Parameters<typeof this.repository.create>[0], 'data'>,
  ) {
    const createdLink = await this.repository.create({
      data,
      ...options,
    });

    return createdLink;
  }
}
