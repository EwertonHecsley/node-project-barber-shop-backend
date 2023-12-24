/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, HttpStatus, NotFoundException, Post, Res } from '@nestjs/common';
import { QueuesService } from './queues.service';
import CreateQueueDto from './dto/create.queue';
import { Response } from 'express';
import { ExpertsService } from 'src/experts/experts.service';

@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService, private readonly expertService: ExpertsService) { }

  @Post()
  async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
    const expert = await this.expertService.findExpertById(data.expertId.toString());
    if (!expert) throw new NotFoundException('O expert não existe.');

    const queueExist = await this.queuesService.queueExpertExistToday(data.expertId);
    if (queueExist) throw new BadRequestException('Já existe uma fila para o expert na data atual.');

    const queue = await this.queuesService.createQueue(data);
    return res.status(HttpStatus.CREATED).json(queue);
  }
}
