import type { Link as LinkModel } from '@prisma/client';

import { prisma } from 'src/shared/database/prisma-client';

import type { StrictOmit } from 'src/shared/helpers/types/strict-omit';

export class PrismaLinksRepository {
  private repository = prisma.link;

  public async save(
    data: Pick<LinkModel, 'originalUrl' | 'shortUrl' | 'userId'>,
    options?: StrictOmit<Parameters<typeof this.repository.create>[0], 'data'>,
  ) {
    const createdLink = await this.repository.create({
      data,
      ...options,
    });

    return createdLink;
  }

  public findByShortCode(
    shortUrl: LinkModel['shortUrl'],
    options?: StrictOmit<
      Parameters<typeof this.repository.findUnique>[0],
      'where'
    >,
  ) {
    return this.repository.findUnique({
      where: { shortUrl, deletedAt: null },
      ...options,
    });
  }
}
