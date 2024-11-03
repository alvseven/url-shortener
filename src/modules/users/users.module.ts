import { Module } from '@nestjs/common';

import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { PrismaUsersRepository } from './repositories/users.repository';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService, PrismaUsersRepository],
})
export class UsersModule {}
