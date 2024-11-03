import type { User as UserModel } from '@prisma/client';

import { prisma } from 'src/shared/database/prisma-client';

import type { StrictOmit } from 'src/shared/helpers/types/strict-omit';

export class PrismaUsersRepository {
  private repository = prisma.user;

  public async save(
    data: Pick<UserModel, 'email' | 'password'>,
    options?: StrictOmit<Parameters<typeof this.repository.create>[0], 'data'>,
  ) {
    const createdUser = await this.repository.create({
      data,
      ...options,
    });

    return createdUser;
  }

  public findByEmail(
    email: UserModel['email'],
    options?: StrictOmit<
      Parameters<typeof this.repository.findUnique>[0],
      'where'
    >,
  ) {
    return this.repository.findUnique({
      where: { email },
      ...options,
    });
  }
}
