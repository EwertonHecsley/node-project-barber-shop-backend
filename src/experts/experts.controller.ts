/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, HttpStatus, Post, Res, Get } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import CreateExpertsDto from './dto/create.experts';
import { Response } from 'express';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) { }

  @Post()
  async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
    const expertExist = await this.expertsService.findEmailExpert(data.email);

    if (expertExist) throw new BadRequestException('Já existe um usuário com email informado.')

    const expert = await this.expertsService.createExpert(data);

    return res.status(HttpStatus.CREATED).json(expert);
  };

  @Get()
  async getAllExperts(@Res() res: Response) {
    const listExperts = await this.expertsService.findAllExperts();
    return res.json(listExperts);
  }



}
