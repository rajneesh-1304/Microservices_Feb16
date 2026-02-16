import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(ORDER_SERVICE_RABBITMQ) private readonly client: ClientProxy,
  ) { }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("order")
  createOrder(@Body() order: any) {
    return this.appService.createorder(order);
  }
}
