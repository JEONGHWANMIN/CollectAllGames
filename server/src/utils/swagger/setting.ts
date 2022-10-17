// const options = new DocumentBuilder()
//   .setTitle('Collect All Games API Docs')
//   .setDescription('API description')
//   .setVersion('1.0.0')
//   .build();
// const document = SwaggerModule.createDocument(app, options);
// SwaggerModule.setup('api-docs', app, document);

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Collect All Games API Docs')
    .setDescription('API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
