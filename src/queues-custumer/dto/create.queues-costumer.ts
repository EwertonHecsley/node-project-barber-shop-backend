/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator"

export default class CreateQueuesCustomerDto {
    @IsNotEmpty({ message: 'O campo name é obrigatório.' })
    name: string

    @IsNotEmpty({ message: 'O campo service é obrigatório.' })
    service: string

    @IsNotEmpty({ message: 'O campo expertId é obrigatório.' })
    expertId: number
}