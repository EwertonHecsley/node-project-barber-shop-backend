/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator"

export default class CreateUserDto {
    @IsNotEmpty({ message: 'O campo name é obrigatório.' })
    name: string

    @IsNotEmpty({ message: 'O campo email é obrigatório.' })
    @IsEmail({}, { message: 'Email inválido.' })
    email: string

    @IsNotEmpty({ message: 'O campo password é obrigatório.' })
    password: string
}