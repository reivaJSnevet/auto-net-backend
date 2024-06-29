import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters/http-exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
    //si se encuentra una propiedad que no esta definida en el DTO, la propiedad se elimina
    whitelist: true,
    forbidNonWhitelisted: true,
  }
));
app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
