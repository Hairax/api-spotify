import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PREFIX = '/api';
const ENV = process.env.ENV ?? 'development';
const TITLE = 'Spotify API';
const DESCRIPTION = 'REST Api Sample REF';
const VERSION = '1.0';
const PORT = process.env.PORT ?? 3000;

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('/api');
  app.enableCors();

  if (ENV === 'development' || ENV === 'testing' || ENV === 'staging') {
    const config = new DocumentBuilder()
      .setTitle(TITLE)
      .setDescription(DESCRIPTION)
      .setVersion(VERSION)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);
  }

  await app.listen(PORT);
}

main().catch((err: Error) => {
  throw new Error(err.message);
});
