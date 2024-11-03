import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaUsersRepository } from '../repositories/users.repository';

import type { GetUserLinksInput } from './get-user-links.dto';

@Injectable()
export class GetUserLinksService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  public async get(userId: GetUserLinksInput['userId']) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
