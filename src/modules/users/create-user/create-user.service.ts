import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import type { CreateUserInput } from './create-user.dto';
import { PrismaUsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  public async create({ email, password }: CreateUserInput) {
    const user = await this.usersRepository.findByEmail(email, {
      select: { id: true },
    });

    if (user) {
      throw new UnprocessableEntityException('Email já cadastrado');
    }

    const passwordSaltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, passwordSaltRounds);

    const createdUser = await this.usersRepository.save({
      email,
      password: hashedPassword,
    });

    return createdUser;
  }
}
