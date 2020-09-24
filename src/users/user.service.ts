import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.interface';
import { ProfessionalSkillsService } from 'src/professionalSkills/professionalSkills.service';
import { SkillRatingsService } from 'src/skillRatings/skillRatings.service';
import { SkillRating } from 'src/skillRatings/skillRatings.interface';
import { UserRole } from './user.roles';
import { ProfessionalForProfileDto } from './DTOs/ProfessionalForProfile.dto';
import { SkillForProfileDto } from 'src/skills/DTOs/skillForProfile.dto';
import { ReviewsService } from 'src/reviews/review.service';
import { Review } from 'src/reviews/review.interface';
import { ReviewDto } from 'src/reviews/DTOs/review.dto';
import { SkillRatingDto } from 'src/skillRatings/DTOs/skillRating.dto';
import { SearchedProfessionalDto } from './DTOs/searchedProfessional.dto';
import { UserDto } from './DTOs/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly professionalSkillsService: ProfessionalSkillsService,
    private readonly skillRatingsService: SkillRatingsService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ _id: id });

    const userToReturn = new UserDto(
      user.id,
      user.name,
      user.picture,
      user.address,
      user.dob,
      user.phone,
      user.role,
      user.playerId,
    );
    return userToReturn;
  }

  //The next function must be optimized
  async findProfessional(id: string): Promise<ProfessionalForProfileDto> {
    const professional: User = await this.userModel.findOne({
      _id: id,
      role: UserRole.PROFESSIONAL,
    });

    const professionalSkills = await this.professionalSkillsService.findByProfessional(
      id,
    );

    const reviews = await this.findReviewsForProfessional(id);
    console.log(reviews);

    const skillsToReturn: SkillForProfileDto[] = [];
    await Promise.all(
      professionalSkills.map(async pSkill => {
        const skillRatings = await this.skillRatingsService.findSkillRatingsForProfessional(
          pSkill.skillId,
          pSkill.professionalId,
        );

        console.log('SKILL RATINGS', skillRatings);

        let sum;
        let overall = null;
        if (skillRatings.length !== 0) {
          sum = await this.calculateSkillRating(skillRatings);
          overall = (sum / skillRatings.length).toFixed(1);
        }

        const skill = new SkillForProfileDto(
          pSkill.skillId,
          parseFloat(overall !== null ? overall : 0),
          pSkill.salary,
        );
        skillsToReturn.push(skill);
      }),
    );

    const professionalToReturn = new ProfessionalForProfileDto(
      professional.id,
      professional.name,
      professional.picture,
      professional.address,
      professional.phone,
      professional.email,
      this.calculateAge(professional.dob),
      reviews,
      professional.playerId,
      skillsToReturn,
    );

    return professionalToReturn;
  }

  async exists(email: string): Promise<boolean> {
    console.log(email);
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      return true;
    }
    return false;
  }

  async create(user: User): Promise<User> {
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    const userToAdd = { ...user };
    userToAdd.password = encryptedPassword;
    const newUser = new this.userModel(userToAdd);
    return await newUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, updatedUser: User): Promise<UserDto> {
    const user = await this.userModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
      useFindAndModify: false,
    });

    const userToReturn = new UserDto(
      user.id,
      user.name,
      user.picture,
      user.address,
      user.dob,
      user.phone,
      user.role,
      user.playerId,
    );
    return userToReturn;
  }

  async search(searchString: string, loggedUserId: string): Promise<User[]> {
    const foundProfessionals: User[] = await this.userModel
      .find({
        name: { $regex: searchString, $options: 'i' },
        role: 2,
      })
      .sort({ name: 'ascending' });

    const arrayWithoutLoggedUser = foundProfessionals.filter(
      user => user.id !== loggedUserId,
    );
    return arrayWithoutLoggedUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.generateJWT(user);
    }
    return null;
  }

  generateJWT(payload: User): Promise<string> {
    return this.jwtService.signAsync({ professional: payload });
  }

  async findProfessionalsBySkill(
    skillId: string,
  ): Promise<SearchedProfessionalDto[]> {
    //Get all the professionalsSkills (id, salary, proId, skillId) of the searched skill

    const professionalSkills = await this.professionalSkillsService.findBySkill(
      skillId,
    );

    let arr = [];

    const promises = await Promise.all(
      professionalSkills.map(async pSkill => {
        const professional = await this.findOne(pSkill.professionalId);
        const skillRatings = await this.skillRatingsService.findSkillRatingsForProfessional(
          pSkill.skillId,
          pSkill.professionalId,
        );

        let sum;
        let overall = null;
        if (skillRatings.length !== 0) {
          sum = await this.calculateSkillRating(skillRatings);
          overall = (sum / skillRatings.length).toFixed(1);
        }

        arr.push(
          new SearchedProfessionalDto(
            professional.id,
            professional.name,
            professional.picture,
            overall === null ? 0 : parseFloat(overall),
            pSkill.salary,
            this.calculateAge(professional.dob),
            professional.playerId,
          ),
        );

        return arr;
      }),
    );
    if (promises[0]) {
      return promises[0];
    }
    return [];
  }

  async findBestProfessionalsForSkill(
    skillId: string,
  ): Promise<SearchedProfessionalDto[]> {
    const skillProfessionals = await this.findProfessionalsBySkill(skillId);
    const bestProfessionals = skillProfessionals.filter(
      item => item.rating >= 4,
    );

    //Return the array sorted by rating in descending order
    return bestProfessionals.sort((a, b) =>
      this.compareRatings(a.rating, b.rating),
    );
  }

  private compareRatings(rating1: number, rating2: number) {
    if (rating1 > rating2) {
      return -1;
    }
    if (rating1 < rating2) {
      return 1;
    }
    return 0;
  }

  async calculateSkillRating(skillRatings: SkillRating[]): Promise<any> {
    let sum = 0;
    skillRatings.forEach(item => {
      sum += item.rating;
    });
    return new Promise((resolve, reject) => {
      resolve(sum);
    });
  }

  private calculateAge(dob: Date): number {
    let ageDate = new Date(Date.now() - dob.getTime());
    return Math.abs(ageDate.getFullYear() - 1970);
  }

  async findReviewsForProfessional(professionalId: string): Promise<any[]> {
    const reviews: SkillRating[] = await this.skillRatingsService.findAllRatingsForProfessional(
      professionalId,
    );

    let reviewsToReturn: SkillRatingDto[] = [];
    const promises = await Promise.all(
      reviews.map(async review => {
        const client = await this.findOne(review.clientId);
        reviewsToReturn.push(
          new SkillRatingDto(
            review.id,
            client.name,
            client.picture,
            review.comment,
            review.rating,
            review.postedAt,
            review.skillId,
          ),
        );

        return reviewsToReturn;
      }),
    );
    if (promises[0]) {
      return promises[0];
    }
    return [];
  }
}
