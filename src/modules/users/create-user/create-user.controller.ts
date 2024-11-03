import { Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

import { CreateUserService } from './create-user.service';
import { CreateUserRequestDTO, CreateUserResponseDTO } from './create-user.dto';

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Req() request: Request) {
    const parsedRequest = new CreateUserRequestDTO({ ...request.body });

    const createdUser = await this.createUserService.create(
      parsedRequest.getAll(),
    );

    const parsedUser = new CreateUserResponseDTO(createdUser).getAll();

    return parsedUser;
  }
}
