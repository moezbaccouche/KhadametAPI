import { Injectable } from '@nestjs/common';
import { Review } from './review.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/user.interface';
import { ReviewDto } from './DTOs/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review')
    private readonly reviewModel: Model<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.find();
  }

  async findOne(id: string): Promise<Review> {
    return await this.reviewModel.findOne({ _id: id });
  }

  async create(review: Review): Promise<Review> {
    const newRequest = new this.reviewModel(review);
    return await newRequest.save();
  }

  async delete(id: string): Promise<Review> {
    return await this.reviewModel.findByIdAndRemove(id);
  }

  async update(id: string, review: Review): Promise<Review> {
    return await this.reviewModel.findByIdAndUpdate(id, review, {
      new: true,
    });
  }
}
