/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, HttpStatus, Post, Res, Get, Param, NotFoundException, Patch } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import CreateExpertsDto from './dto/create.experts';
import { Response } from 'express';
import UpdateExpertDto from './dto/update.experts';

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
  };

  @Get(':id')
  async getExpertById(@Param('id') id: string, @Res() res: Response) {
    const expert = await this.expertsService.findExpertById(id);
    if (!expert) throw new NotFoundException('Usuáro não encontrado com esse ID.');

    return res.status(HttpStatus.OK).json(expert);
  }

  @Patch(':id')
  async updateExpert(@Param('id') id: string, @Body() data: UpdateExpertDto, @Res() res: Response) {
    const expert = await this.expertsService.findExpertById(id);
    if (!expert) throw new NotFoundException('Usuário não encontrado com esse ID.');

    if (data.email) {
      const emailExist = await this.expertsService.findEmailExpert(data.email);
      if (emailExist) throw new BadRequestException('Já existe um usuário com email informado.');
    }

    await this.expertsService.updateExpert(id, data);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

}
