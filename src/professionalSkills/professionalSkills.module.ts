import { Module } from '@nestjs/common';
import { ProfessionalSkillsController } from './professionalSkills.controller';
import { ProfessionalSkillsService } from './professionalSkills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSkillSchema } from './professionalSkills.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProfessionalSkills', schema: ProfessionalSkillSchema },
    ]),
  ],
  controllers: [ProfessionalSkillsController],
  providers: [ProfessionalSkillsService],
})
export class ProfessionalSkillsModule {}
