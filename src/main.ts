import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { makeApp } from './make_app';

async function bootstrap() {
  const app = await makeApp();
  //swagger 문서화 관련

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JHTV API Document')
    .setDescription('JHTV API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, document);
  await app.listen(3000, '0.0.0.0');
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
