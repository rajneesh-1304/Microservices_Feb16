import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inbox } from '../inbox/inbox.entity';
import { RabbitConnection } from './rabbit.connection';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConsumerService{
  constructor(
    private readonly rabbit: RabbitConnection,
    @InjectRepository(Inbox)
    private readonly inboxRepo: Repository<Inbox>
  ) {}

  async consume() {
    const conn = await this.rabbit.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    const q = await channel.assertQueue('orders.queue', { durable: true });

    channel.consume(q.queue, async (msg) => {
      if (!msg) return;
      const message = JSON.parse(msg.content.toString());

      try {
        const isProcessed = await this.inboxRepo.findOne({
          where: { messageId: message },
        });

        if (!isProcessed) {
          const inboxMessage = this.inboxRepo.create({
            messageId: message,
            handler: 'Default',
          });
          await this.inboxRepo.save(inboxMessage);
        }
        channel.ack(msg);
      } catch (err) {
        console.error(err);
        channel.nack(msg, false, true);
      }
    });
  }
}
