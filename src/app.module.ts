/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from './dataBase/prisma.module';
import { ExpertsModule } from './experts/experts.module';
import { QueuesModule } from './queues/queues.module';
import { QueuesCustumerModule } from './queues-custumer/queues-custumer.module';

@Module({
  imports: [PrismaModule, ExpertsModule, QueuesModule, QueuesCustumerModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
