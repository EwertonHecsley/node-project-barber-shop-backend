/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, HttpStatus, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
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

  @Patch(':id')
  async attendCustomer(@Param('id') id: string, @Res() res: Response) {
    const customer = await this.queuesCustumerService.findCustomer(Number(id));
    if (!customer) throw new NotFoundException('O cliente não existe.');

    await this.queuesCustumerService.attendCustomer(customer.id);
    return res.status(HttpStatus.NO_CONTENT).send();
  };

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string, @Res() res: Response) {
    const custumer = await this.queuesCustumerService.findCustomer(Number(id));
    if (!custumer) throw new NotFoundException('O cliente não existe.');

    await this.queuesCustumerService.deleteCustomer(custumer.id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
};
