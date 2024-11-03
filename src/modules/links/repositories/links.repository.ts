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

  public async softDelete(
    shortCode: LinkModel['shortUrl'],
    deletedAt: LinkModel['deletedAt'],
  ) {
    await this.repository.update({
      where: { shortUrl: shortCode },
      data: { deletedAt },
    });
  }

  public async updateByShortCode(
    shortCode: LinkModel['shortUrl'],
    newUrl: LinkModel['originalUrl'],
  ) {
    const updatedLink = await this.repository.update({
      where: { shortUrl: shortCode },
      data: { originalUrl: newUrl },
    });

    return updatedLink;
  }

  public async updateClicksCountById(
    id: LinkModel['shortUrl'],
    newClicksCount: LinkModel['clicks'],
  ) {
    await this.repository.update({
      where: { id },
      data: { clicks: newClicksCount },
    });
  }
}
