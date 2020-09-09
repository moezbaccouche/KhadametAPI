import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProfessionalSkillSchema } from 'src/professionalSkills/professionalSkills.schema';
import { SkillRatingSchema } from 'src/skillRatings/skillRatings.schema';
import { ProfessionalSkillsService } from 'src/professionalSkills/professionalSkills.service';
import { SkillRatingsService } from 'src/skillRatings/skillRatings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'ProfessionalSkills', schema: ProfessionalSkillSchema },
      { name: 'SkillRating', schema: SkillRatingSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ProfessionalSkillsService, SkillRatingsService],
})
export class UsersModule {}
