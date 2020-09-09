import { Module } from '@nestjs/common';
import { SkillRatingsController } from './skillRatings.controller';
import { SkillRatingsService } from './skillRatings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillRatingSchema } from './skillRatings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SkillRating', schema: SkillRatingSchema },
    ]),
  ],
  controllers: [SkillRatingsController],
  providers: [SkillRatingsService],
})
export class SkillRatingsModule {}
