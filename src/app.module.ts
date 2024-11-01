import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinkModule } from './modules/links/link.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [UserModule, LinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
