/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Post, Query, Res } from '@nestjs/common';
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
  };

  @Get(':expertId')
  async getExpertQueues(@Query('expertId') expertId: number, @Res() res: Response) {
    if (expertId) {
      const expert = await this.expertService.findExpertById(expertId.toString());
      if (!expert) throw new NotFoundException('O expert não existe.');

      const queues = await this.queuesService.getExpertsQueues(expertId);
      return res.json(queues);
    };
    const queues = await this.queuesService.getAllQueues();
    return res.json(queues);
  };
}
