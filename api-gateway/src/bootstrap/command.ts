import { Command, CommandRunner, Option } from 'nest-commander';
import { PublisherService } from '../messaging/publisher.service';
import { OutboxService } from '../services/outbox.service';

@Command({ name: 'sayHello', options: { isDefault: true } })
export class PublishCommand extends CommandRunner {
  
  constructor(
    private readonly outbox: OutboxService,
    private readonly publisher: PublisherService,
  ) {
    super();
  }
  

  async run(inputs: string[], options?: Record<string, any>): Promise<void> {

    const messages = await this.outbox.getPendingMsg();

    for (const msg of messages) {
    await this.publisher.publish(msg.id);
    await this.outbox.markDispatched(msg.id.toString());
  }
  }
}
