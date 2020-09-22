import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationMessage } from './conversationMessages.interface';

@Injectable()
export class ConversationMessagesService {
  constructor(
    @InjectModel('ConversationMessage')
    private readonly conversationMessageModel: Model<ConversationMessage>,
  ) {}

  async findAll(): Promise<ConversationMessage[]> {
    return await this.conversationMessageModel.find();
  }

  async findOne(id: string): Promise<ConversationMessage> {
    return await this.conversationMessageModel.findOne({ _id: id });
  }

  async create(
    conversationMessage: ConversationMessage,
  ): Promise<ConversationMessage> {
    const newConversationMessage = new this.conversationMessageModel(
      conversationMessage,
    );
    return await newConversationMessage.save();
  }

  async delete(id: string): Promise<ConversationMessage> {
    return await this.conversationMessageModel.findByIdAndRemove(id);
  }

  async findConversationMessage(id: string): Promise<ConversationMessage[]> {
    return await this.conversationMessageModel.find({ conversationId: id });
  }
}
