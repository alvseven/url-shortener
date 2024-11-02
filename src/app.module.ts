import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinkModule } from './modules/links/link.module';

@Module({
  imports: [LinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
