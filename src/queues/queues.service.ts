/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dataBase/prisma.service';
import CreateQueueDto from './dto/create.queue';

@Injectable()
export class QueuesService {
    constructor(private readonly prisma: PrismaService) { }

    async createQueue(data: CreateQueueDto) {
        return await this.prisma.queue.create({ data });
    };

    async queueExpertExistToday(expertId: number) {
        return await this.prisma.queue.findFirst({
            where: {
                createdAt: {
                    equals: new Date()
                },
                expertId
            }
        })
    };

    async getAllQueues() {
        return await this.prisma.queue.findMany();
    }

    async getExpertsQueues(expertId: number) {
        return await this.prisma.queue.findMany({
            where: {
                expertId
            },
            include: {
                expert: true
            }
        })
    };
};