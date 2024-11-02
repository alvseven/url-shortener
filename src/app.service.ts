import { Injectable } from '@nestjs/common';

import { prisma } from './shared/database/prisma-client';

@Injectable()
export class AppService {
  async healthCheck() {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: 'success',
      date: Date.now(),
    };
  }
}
