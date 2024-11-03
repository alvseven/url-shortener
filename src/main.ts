import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parsedEnvs } from './shared/config/env';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription(
      'An api to shorten URLs with user authentication and clicks count',
    )
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(parsedEnvs.API_PORT);
}

bootstrap();
