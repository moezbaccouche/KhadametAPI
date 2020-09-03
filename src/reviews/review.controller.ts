import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ReviewsService } from './review.service';
import { Review } from './review.interface';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('')
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Post()
  create(@Body() newReview: Review): Promise<Review> {
    return this.reviewsService.create(newReview);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReview: Review,
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReview);
  }
}
