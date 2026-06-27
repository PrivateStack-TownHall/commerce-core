import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { PrismaService } from './prisma/prisma.service';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);

  const prisma = app.get(PrismaService);

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableShutdownHooks();

  await prisma.enableShutdownHooks(app);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('APP_NAME') ?? 'Operations Core API')
    .setDescription(configService.get<string>('SWAGGER_DESCRIPTION') ?? '')
    .setVersion(configService.get<string>('APP_VERSION') ?? '1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);

  const url = await app.getUrl();

  logger.log(`Application running at ${url}`);

  logger.log(`Swagger running at ${url}/docs`);
}

bootstrap();
