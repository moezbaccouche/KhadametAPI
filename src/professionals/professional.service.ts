import { Injectable } from '@nestjs/common';
import { Professional } from './professional.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel('Professional')
    private readonly professionalModel: Model<Professional>,
  ) {}

  async findAll(): Promise<Professional[]> {
    return await this.professionalModel.find();
  }

  async findOne(id: string): Promise<Professional> {
    return await this.professionalModel.findOne({ _id: id });
  }

  async create(professional: Professional): Promise<Professional> {
    const newProfessional = new this.professionalModel(professional);
    return await newProfessional.save();
  }

  async delete(id: string): Promise<Professional> {
    return await this.professionalModel.findByIdAndRemove(id);
  }

  async update(id: string, professional: Professional): Promise<Professional> {
    return await this.professionalModel.findByIdAndUpdate(id, professional, {
      new: true,
    });
  }

  async search(searchString: string): Promise<Professional[]> {
    const found = await this.professionalModel.find({
      name: { $regex: searchString, $options: 'i' },
    });
    console.log(found);
    return found;
  }
}
