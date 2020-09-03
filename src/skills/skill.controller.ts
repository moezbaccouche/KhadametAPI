import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { SkillsService } from './skill.service';
import { Skill } from './skill.interface';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('')
  findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.findOne(id);
  }

  @Post()
  create(@Body() newSkill: Skill): Promise<Skill> {
    return this.skillsService.create(newSkill);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSkill: Skill): Promise<Skill> {
    return this.skillsService.update(id, updateSkill);
  }
}
