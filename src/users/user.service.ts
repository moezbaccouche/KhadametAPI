import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    console.log(id);
    return await this.userModel.findOne({ _id: id });
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

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async search(searchString: string): Promise<User[]> {
    const found = await this.userModel.find({
      name: { $regex: searchString, $options: 'i' },
    });
    return found;
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
}
