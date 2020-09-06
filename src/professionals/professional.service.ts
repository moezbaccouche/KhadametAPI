import { Injectable } from '@nestjs/common';
import { Professional } from './professional.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel('Professional')
    private readonly professionalModel: Model<Professional>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<Professional[]> {
    return await this.professionalModel.find();
  }

  async findOne(id: string): Promise<Professional> {
    return await this.professionalModel.findOne({ _id: id });
  }

  async exists(email: string): Promise<boolean> {
    const professional = await this.professionalModel.findOne({ email: email });
    if (professional) {
      return true;
    }
    return false;
  }

  async create(professional: Professional): Promise<Professional> {
    const encryptedPassword = await bcrypt.hash(professional.password, 10);
    const professionalToAdd = { ...professional };
    professionalToAdd.password = encryptedPassword;
    const newProfessional = new this.professionalModel(professionalToAdd);
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
    return found;
  }

  async login(email: string, password: string): Promise<string> {
    const professional = await this.professionalModel.findOne({ email: email });

    const passwordMatches = await bcrypt.compare(
      password,
      professional.password,
    );
    if (professional && passwordMatches) {
      return this.generateJWT(professional);
    }
    return '';
  }

  generateJWT(payload: Professional): Promise<string> {
    return this.jwtService.signAsync({ professional: payload });
  }
}
