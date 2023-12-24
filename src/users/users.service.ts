/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dataBase/prisma.service';
import CreateUserDto from './dto/create.user';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateUserDto) {
        const hashPassword = await bcrypt.hash(data.password, 8);
        return await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPassword
            }
        });
    };

    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        })
    };
};
