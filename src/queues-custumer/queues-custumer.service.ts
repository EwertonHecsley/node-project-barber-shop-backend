/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dataBase/prisma.service';

type CreateCustomer = {
    name: string
    service: string
    queueId: number
}

@Injectable()
export class QueuesCustumerService {
    constructor(private readonly prisma: PrismaService) { }

    async addCustomer(data: CreateCustomer) {
        return await this.prisma.queueCustomer.create({ data })
    };

    async getExpertQueueToday(expertId: number) {
        return await this.prisma.queue.findFirst({
            where: {
                expertId,
                createdAt: {
                    equals: new Date()
                }
            }
        })
    }
}
