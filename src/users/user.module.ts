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
import { ReviewSchema } from 'src/reviews/review.schema';
import { ReviewsService } from 'src/reviews/review.service';
import { RequestsModule } from 'src/requests/request.module';
import { ProfessionalSkillsModule } from 'src/professionalSkills/professionalSkills.module';
import { SkillRatingsModule } from 'src/skillRatings/skillRatings.module';

@Module({
  imports: [
    ProfessionalSkillsModule,
    SkillRatingsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
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
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
