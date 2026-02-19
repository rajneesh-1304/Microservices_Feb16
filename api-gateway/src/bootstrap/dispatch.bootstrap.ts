import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { OutboxService } from "../services/outbox.service";
import { PublisherService } from "../messaging/publisher.service";
import { CommandFactory } from "nest-commander";
import { Command } from "./command.module";

async function bootstrap() {

  // await CommandFactory.run(Command, {
  //   logger: ['warn', 'error'],
  // });
  const app = await NestFactory.createApplicationContext(AppModule);

  const outbox = app.get(OutboxService);
  const publisher = app.get(PublisherService);

  const messages = await outbox.getPendingMsg();

  for (const msg of messages) {
    await publisher.publish(msg.id);
    await outbox.markDispatched(msg.id.toString());
  }

  await app.close();
}
bootstrap();
