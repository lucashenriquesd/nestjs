import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerService } from '@/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const swaggerService = app.get(SwaggerService);

  swaggerService.enableOpenApi(app);

  const port = configService.get<number>('NODE_PORT') || 3000;

  await app.listen(port);
}
bootstrap();
