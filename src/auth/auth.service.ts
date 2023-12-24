/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async validateUser(userEmail: string, password: string) {
        const user = await this.userService.findUserByEmail(userEmail);
        if (!user) throw new UnauthorizedException('Email ou senha inválida.');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) throw new UnauthorizedException('Email ou senha inválida.');

        return user;
    };
};
