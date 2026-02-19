import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerService } from './consumer.service';
import { RabbitConnection } from './rabbit.connection';
import { Inbox } from '../inbox/inbox.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inbox]), 
  ],
  providers: [ConsumerService, RabbitConnection],
  exports: [ConsumerService],
})
export class MessagingModule {}
