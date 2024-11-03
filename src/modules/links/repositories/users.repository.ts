import type { User as UserModel } from '@prisma/client';

import { prisma } from 'src/shared/database/prisma-client';

export class PrismaUsersRepository {
  private repository = prisma.user;

  public findById(id: UserModel['id']) {
    return this.repository.findUnique({
      where: { id },
      select: {
        links: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
