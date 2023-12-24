/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QueuesCustumerService } from './queues-custumer.service';
import { QueuesCustumerController } from './queues-custumer.controller';

@Module({
  controllers: [QueuesCustumerController],
  providers: [QueuesCustumerService],
})
export class QueuesCustumerModule { }
