import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConsumerService } from './messaging/consumer.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly consumer: ConsumerService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('consumer')
  getOrder(){
    return this.consumer.consume();
  }
}
