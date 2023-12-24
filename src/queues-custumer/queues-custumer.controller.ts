/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, NotFoundException, Post, Res } from '@nestjs/common';
import { QueuesCustumerService } from './queues-custumer.service';
import CreateQueuesCustomerDto from './dto/create.queues-costumer';
import { Response } from 'express';

@Controller('queues-custumer')
export class QueuesCustumerController {
  constructor(private readonly queuesCustumerService: QueuesCustumerService) { }

  @Post()
  async addCustomer(@Body() data: CreateQueuesCustomerDto, @Res() res: Response) {
    const queueExist = await this.queuesCustumerService.getExpertQueueToday(data.expertId);
    if (!queueExist) throw new NotFoundException('A fila não existe.');

    const customer = await this.queuesCustumerService.addCustomer({
      name: data.name,
      service: data.service,
      queueId: queueExist.id
    });
    return res.status(HttpStatus.CREATED).json(customer);
  };
}
