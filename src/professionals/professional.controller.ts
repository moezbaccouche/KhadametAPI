import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ProfessionalsService } from './professional.service';
import { Professional } from './professional.interface';
import { response } from 'express';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get('')
  findAll(): Promise<Professional[]> {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Professional> {
    return this.professionalsService.findOne(id);
  }

  @Post()
  create(@Body() newClient: Professional): Promise<Professional> {
    return this.professionalsService.create(newClient);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Professional> {
    return this.professionalsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessional: Professional,
  ): Promise<Professional> {
    return this.professionalsService.update(id, updateProfessional);
  }
}
