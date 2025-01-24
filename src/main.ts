import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerService } from '@/modules/swagger/swagger.service';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter';
import { TransformResponseInterceptor } from '@/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerService = app.get(SwaggerService);

  swaggerService.enableOpenApi(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  const port = 3000;

  await app.listen(port);
}
bootstrap();
