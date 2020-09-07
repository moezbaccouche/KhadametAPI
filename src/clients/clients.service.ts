import { Injectable } from '@nestjs/common';
import { Client } from './client.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  async findOne(id: string): Promise<Client> {
    console.log(id);
    return await this.clientModel.findOne({ _id: id });
  }

  async exists(email: string): Promise<boolean> {
    console.log(email);
    const client = await this.clientModel.findOne({ email: email });
    if (client) {
      return true;
    }
    return false;
  }

  async create(client: Client): Promise<Client> {
    const encryptedPassword = await bcrypt.hash(client.password, 10);
    const clientToAdd = { ...client };
    clientToAdd.password = encryptedPassword;
    const newClient = new this.clientModel(clientToAdd);
    return await newClient.save();
  }

  async delete(id: string): Promise<Client> {
    return await this.clientModel.findByIdAndRemove(id);
  }

  async update(id: string, client: Client): Promise<Client> {
    return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
  }
}
