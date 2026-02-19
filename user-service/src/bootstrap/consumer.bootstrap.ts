import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { ConsumerService } from "../messaging/consumer.service";
import { CommandFactory } from "nest-commander";
import { Command } from "./command.module";

async function bootstrap() {

  await CommandFactory.run(Command, {
    logger: ['warn', 'error'],
  });
  // const app = await NestFactory.createApplicationContext(AppModule);

  // const consumer = app.get(ConsumerService);
  // await consumer.consume();
  // await app.close();
}
bootstrap();
