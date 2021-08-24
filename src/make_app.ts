import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
  } from 'typeorm-transactional-cls-hooked';
  import { HttpAdapterHost, NestFactory } from '@nestjs/core';
  import { AppModule } from './app_modules/app.module';
  import * as express from 'express';
  import { join } from 'path';
  import { ValidationPipe } from '@nestjs/common';
  import { AllExceptionsFilter } from './common/filters/all_exceptions_filter';
  import { NestExpressApplication } from '@nestjs/platform-express';
  import * as bodyParser from 'body-parser';
  
  export async function makeApp() {
    /**
     * Propagate transactions.
     *
     * https://github.com/odavid/typeorm-transactional-cls-hooked
     */
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true,
    });
    //app.use(helmet());
    app.use(express.static(join(process.cwd(), '/uploads')));
    app.setGlobalPrefix('api');
    // app.setBaseViewsDir(join(process.cwd(), 'views'));
    // app.setViewEngine('hbs');
    app.useGlobalPipes(new ValidationPipe());
    app.use(bodyParser.json({ limit: '10mb' }));
    const { httpAdapter } = app.get(HttpAdapterHost);
  
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  
    return app;
  }
  