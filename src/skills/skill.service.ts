import { Injectable } from '@nestjs/common';
import { Skill } from './skill.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel('Skill')
    private readonly skillModel: Model<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return await this.skillModel.find();
  }

  async findOne(id: string): Promise<Skill> {
    return await this.skillModel.findOne({ _id: id });
  }

  async create(review: Skill): Promise<Skill> {
    const newSkill = new this.skillModel(review);
    return await newSkill.save();
  }

  async delete(id: string): Promise<Skill> {
    return await this.skillModel.findByIdAndRemove(id);
  }

  async update(id: string, skill: Skill): Promise<Skill> {
    return await this.skillModel.findByIdAndUpdate(id, skill, {
      new: true,
    });
  }
}
