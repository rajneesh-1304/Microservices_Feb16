import { Module } from '@nestjs/common';
import { PublishCommand } from './command';
import { PublisherService } from '../messaging/publisher.service';
import { OutboxService } from '../services/outbox.service';
import { RabbitConnection } from '../messaging/rabbit.connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from 'src/data-source';
import { OutboxModule } from 'src/services/outbox.module';

@Module({
  imports:[TypeOrmModule.forRoot({
        ...AppDataSource.options, 
      }),
      OutboxModule],
  providers: [PublishCommand, PublisherService, OutboxService, RabbitConnection],
})
export class Command {}
