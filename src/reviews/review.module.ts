import { Module } from '@nestjs/common';
import { ReviewsController } from './review.controller';
import { ReviewsService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
