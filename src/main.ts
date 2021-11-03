import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {seedDB} from "./cancer-types/seeders/data";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  await seedDB()
}
bootstrap();
