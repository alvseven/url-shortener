import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { PrismaUsersRepository } from './repositories/users.repository';
import { SignInInput } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: PrismaUsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInInput) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto(s)');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou senha incorreto(s)');
    }

    const payload = { sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
