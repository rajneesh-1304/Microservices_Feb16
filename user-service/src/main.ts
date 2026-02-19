import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3004);
  
  console.log('Listening on port 3004');
}
bootstrap();
