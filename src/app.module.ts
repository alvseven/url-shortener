import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinkModule } from './modules/links/links.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, LinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
