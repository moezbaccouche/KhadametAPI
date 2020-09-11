import { Injectable } from '@nestjs/common';
import { SkillRating } from './skillRatings.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SkillRatingsService {
  constructor(
    @InjectModel('SkillRating')
    private readonly skillRatingModel: Model<SkillRating>,
  ) {}

  async findAll(): Promise<SkillRating[]> {
    return await this.skillRatingModel.find();
  }

  async findOne(id: string): Promise<SkillRating> {
    return await this.skillRatingModel.findOne({ _id: id });
  }

  async create(skillRating: SkillRating): Promise<SkillRating> {
    const newSkillRating = new this.skillRatingModel(skillRating);
    return await newSkillRating.save();
  }

  async delete(id: string): Promise<SkillRating> {
    return await this.skillRatingModel.findByIdAndRemove(id);
  }

  async update(id: string, skillRating: SkillRating): Promise<SkillRating> {
    return await this.skillRatingModel.findByIdAndUpdate(id, skillRating, {
      new: true,
    });
  }

  async findSkillRatingsForProfessional(
    skillId: string,
    professionalId: string,
  ): Promise<SkillRating[]> {
    return this.skillRatingModel.find({
      skillId: skillId,
      professionalId: professionalId,
    });
  }

  async findAllRatingsForProfessional(
    professionalId: string,
  ): Promise<SkillRating[]> {
    return this.skillRatingModel.find({
      professionalId,
    });
  }
}
