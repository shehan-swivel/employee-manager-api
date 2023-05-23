import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { getAllowedOrigins } from './utils/common-util';
import winstonLogger from './utils/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  // Enable CORS only for the provided origins.
  app.enableCors({ origin: getAllowedOrigins() });

  app.setGlobalPrefix('api');

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Employee Manager')
    .setDescription('REST API for Employee Manager')
    .setVersion(process.env.npm_package_version)
    .addApiKey({ type: 'apiKey', name: 'X-Api-Key', in: 'header' }, 'XApiKey')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 4000);
}

(async () => {
  await bootstrap();
})();
