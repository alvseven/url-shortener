import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

import { parsedEnvs } from 'src/shared/config/env';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: parsedEnvs.JWT_SECRET,
      signOptions: { expiresIn: parsedEnvs.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}