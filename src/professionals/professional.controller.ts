import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProfessionalsService } from './professional.service';
import { Professional } from './professional.interface';
import { response } from 'express';
import { ProfessionalDto } from './dto/professional.dto';
import { SearchedProfessionalDto } from './dto/searchedProfessional.dto';

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

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string): Promise<boolean> {
    return this.professionalsService.exists(email);
  }

  @Post()
  create(@Body() newProfessional: Professional): Promise<Professional> {
    return this.professionalsService.create(newProfessional);
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

  @Get('/search/:searchString')
  search(@Param('searchString') searchString: string): Promise<Professional[]> {
    return this.professionalsService.search(searchString);
  }

  @Post('login')
  login(
    @Body() credentials: { email: string; password: string },
  ): Promise<string> {
    return this.professionalsService.login(
      credentials.email,
      credentials.password,
    );
  }

  // @Get('skill/:id')
  // findProfessionalsBySkill(
  //   @Param('id') skillId: string,
  // ): Promise<SearchedProfessionalDto[]> {
  //   return this.professionalsService.findProfessionalsBySkill(skillId);
  // }

  // @Get('skill/:id')
  // findProfessionalsBySkill(@Param('id') skillId: string): void {
  //   this.professionalsService.findProfessionalsBySkillV2(skillId);
  // }
}
