import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parsedEnvs } from './shared/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(parsedEnvs.API_PORT);
}
bootstrap();
