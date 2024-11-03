import type { Link as LinkModel } from '@prisma/client';

import { prisma } from 'src/shared/database/prisma-client';

import { StrictOmit } from 'src/shared/helpers/types/strict-omit';

export class PrismaLinksRepository {
  private repository = prisma.link;

  public async save(
    data: Pick<LinkModel, 'originalUrl' | 'shortUrl'>,
    options?: StrictOmit<Parameters<typeof this.repository.create>[0], 'data'>,
  ) {
    const createdLink = await this.repository.create({
      data,
      ...options,
    });

    return createdLink;
  }

  public async findByShortCode(
    shortUrl: LinkModel['shortUrl'],
    options?: StrictOmit<
      Parameters<typeof this.repository.findUnique>[0],
      'where'
    >,
  ) {
    return this.repository.findUnique({
      where: { shortUrl },
      ...options,
    });
  }
}
