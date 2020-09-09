import { Injectable } from '@nestjs/common';
import { Professional } from './professional.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalSkill } from 'src/professionalSkills/professionalSkills.interface';
import { ProfessionalSkillsService } from 'src/professionalSkills/professionalSkills.service';
import { SearchedProfessionalDto } from './dto/searchedProfessional.dto';
import { SkillRatingsService } from 'src/skillRatings/skillRatings.service';
import { SkillRating } from 'src/skillRatings/skillRatings.interface';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectModel('Professional')
    private readonly professionalModel: Model<Professional>,
    private readonly jwtService: JwtService,
    private readonly professionalSkillsService: ProfessionalSkillsService,
    private readonly skillRatingsService: SkillRatingsService,
  ) {}

  async findAll(): Promise<Professional[]> {
    return await this.professionalModel.find();
  }

  async findOne(id: string): Promise<Professional> {
    console.log('ID', id);
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

  // async findProfessionalsBySkill(
  //   skillId: string,
  // ): Promise<SearchedProfessionalDto[]> {
  //   //Get all the professionalsSkills (id, salary, proId, skillId) of the searched skill
  //   const professionalSkills: ProfessionalSkill[] = await this.professionalSkillsService.findBySkill(
  //     skillId,
  //   );

  //   let searchedProfessionals: SearchedProfessionalDto[] = [];

  //   professionalSkills.map(async pSkill => {
  //     const professional = await this.findOne(pSkill.professionalId);

  //     //Get the skill ratings for the professional
  //     const skillRatings = await this.skillRatingsService.findSkillRatingsForProfessional(
  //       pSkill.skillId,
  //       pSkill.professionalId,
  //     );

  //     //Sum all the ratings and divide them by the number of ratings
  //     let sum = 0;

  //     skillRatings.map(skillRating => {
  //       sum += skillRating.rating;
  //     });

  //     let skillRating = (sum / skillRatings.length).toFixed(1);
  //     searchedProfessionals.push(
  //       new SearchedProfessionalDto(
  //         professional.name,
  //         professional.picture,
  //         parseFloat(skillRating),
  //         pSkill.salary,
  //       ),
  //     );
  //   });
  //   return searchedProfessionals;
  // }
}
