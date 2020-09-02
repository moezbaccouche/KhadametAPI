import { Injectable } from '@nestjs/common';
import { Request } from './request.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel('Request')
    private readonly requestModel: Model<Request>,
  ) {}

  async findAll(): Promise<Request[]> {
    return await this.requestModel.find();
  }

  async findOne(id: string): Promise<Request> {
    return await this.requestModel.findOne({ _id: id });
  }

  async create(request: Request): Promise<Request> {
    const newRequest = new this.requestModel(request);
    return await newRequest.save();
  }

  async delete(id: string): Promise<Request> {
    return await this.requestModel.findByIdAndRemove(id);
  }

  async update(id: string, request: Request): Promise<Request> {
    return await this.requestModel.findByIdAndUpdate(id, request, {
      new: true,
    });
  }
}
