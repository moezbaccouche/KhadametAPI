import { SkillRatingsService } from './skillRatings.service';
import { SkillRating } from './skillRatings.interface';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
} from '@nestjs/common';

@Controller('skillRatings')
export class SkillRatingsController {
  constructor(private readonly ratingSkillsService: SkillRatingsService) {}

  @Get('')
  findAll(): Promise<SkillRating[]> {
    return this.ratingSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SkillRating> {
    return this.ratingSkillsService.findOne(id);
  }

  @Post()
  create(@Body() newSkillRating: SkillRating): Promise<SkillRating> {
    return this.ratingSkillsService.create(newSkillRating);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<SkillRating> {
    return this.ratingSkillsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillRating: SkillRating,
  ): Promise<SkillRating> {
    return this.ratingSkillsService.update(id, updateSkillRating);
  }
}
