import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professional.service';
import { ProfessionalsController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSchema } from './professional.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfessionalSkillsService } from 'src/professionalSkills/professionalSkills.service';
import { ProfessionalSkillSchema } from 'src/professionalSkills/professionalSkills.schema';
import { SkillRatingSchema } from 'src/skillRatings/skillRatings.schema';
import { SkillRatingsService } from 'src/skillRatings/skillRatings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professional', schema: ProfessionalSchema },
      { name: 'ProfessionalSkills', schema: ProfessionalSkillSchema },
      { name: 'SkillRating', schema: SkillRatingSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '100s' },
      }),
    }),
  ],
  controllers: [ProfessionalsController],
  providers: [
    ProfessionalsService,
    ProfessionalSkillsService,
    SkillRatingsService,
  ],
})
export class ProfessionalsModule {}
