import { Module } from '@nestjs/common';
import { SkillsController } from './skill.controller';
import { SkillsService } from './skill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Skill', schema: SkillSchema }]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
