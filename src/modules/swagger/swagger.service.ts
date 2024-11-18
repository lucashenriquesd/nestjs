import { Injectable, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  enableOpenApi(app: INestApplication): void {
    const openApiConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle('Nestjs')
      .setDescription('Nestjs project with batteries included')
      .setVersion('1.0')
      .build();

    const openApiDocument: OpenAPIObject = SwaggerModule.createDocument(
      app,
      openApiConfig,
    );

    SwaggerModule.setup(`swagger`, app, openApiDocument);
  }
}
