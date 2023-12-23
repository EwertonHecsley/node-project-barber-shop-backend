/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule { }
