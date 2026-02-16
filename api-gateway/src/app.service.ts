import { Inject, Injectable } from '@nestjs/common';
import { ORDER_SERVICE_RABBITMQ } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Outbox } from './outbox/outbox.entity';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource, @Inject(ORDER_SERVICE_RABBITMQ) private readonly client: ClientProxy
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createorder(order: any) {
    const outRepo = this.dataSource.getRepository(Outbox);
    const data = outRepo.create({ message: order });
    await outRepo.save(data);
    return { message: "Order placed successfully" };
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processOutbox() {
    const outRepo = this.dataSource.getRepository(Outbox);
    const pending = await outRepo.find({ where: { status: 'PENDING' } });

    for (const item of pending) {
      try {
        this.client.emit('order-created', item.message);

        item.status = 'COMPLETED';
        await outRepo.save(item);

        console.log(`Processed outbox item ${item.id}`);
      } catch (err) {
        console.error(`Failed to process outbox item ${item.id}:`, err);
      }
    }
  }
}