import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ProfessionalSkillsService } from './professionalSkills.service';
import { ProfessionalSkill } from './professionalSkills.interface';

@Controller('professionalSkills')
export class ProfessionalSkillsController {
  constructor(
    private readonly professionalSkillsService: ProfessionalSkillsService,
  ) {}

  @Get('')
  findAll(): Promise<ProfessionalSkill[]> {
    return this.professionalSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProfessionalSkill> {
    return this.professionalSkillsService.findOne(id);
  }

  @Post()
  create(
    @Body() newProfessionalSkill: ProfessionalSkill,
  ): Promise<ProfessionalSkill> {
    console.log('REACHED');
    return this.professionalSkillsService.create(newProfessionalSkill);
  }

  @Post('many')
  createMany(
    @Body('skills') newProfessionalSkills: ProfessionalSkill[],
    @Body('professionalId') professionalId: string,
  ): Promise<ProfessionalSkill[]> {
    return this.professionalSkillsService.createMany(
      newProfessionalSkills,
      professionalId,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ProfessionalSkill> {
    return this.professionalSkillsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalSkill: ProfessionalSkill,
  ): Promise<ProfessionalSkill> {
    return this.professionalSkillsService.update(id, updateProfessionalSkill);
  }
}
