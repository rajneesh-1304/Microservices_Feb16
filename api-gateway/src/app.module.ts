import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { OutboxModule } from './services/outbox.module';
import { PublisherService } from './messaging/publisher.service';
import { RabbitConnection } from './messaging/rabbit.connection';
import { AppDataSource } from './data-source'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options, 
    }),
    OutboxModule
  ],
  controllers: [AppController],
  providers: [AppService, PublisherService, RabbitConnection],
})
export class AppModule {}
