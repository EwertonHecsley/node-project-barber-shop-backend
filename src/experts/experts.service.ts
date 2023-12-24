/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dataBase/prisma.service';
import CreateExpertsDto from './dto/create.experts';
import UpdateExpertDto from './dto/update.experts';

@Injectable()
export class ExpertsService {
    constructor(private readonly prisma: PrismaService) { }

    async findEmailExpert(email: string) {
        return await this.prisma.expert.findUnique({
            where: {
                email
            }
        })
    };

    async createExpert(data: CreateExpertsDto) {
        return await this.prisma.expert.create({ data })
    };

    async findAllExperts() {
        return await this.prisma.expert.findMany();
    };

    async findExpertById(id: string) {
        const id_number = parseInt(id);
        return await this.prisma.expert.findFirst({
            where: {
                id: id_number
            }
        })
    };

    async updateExpert(id: string, data: UpdateExpertDto) {
        const id_number = parseInt(id);
        await this.prisma.expert.update({
            where: {
                id: id_number
            },
            data
        })
    };
};
