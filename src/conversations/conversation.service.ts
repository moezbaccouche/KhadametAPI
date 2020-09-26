import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from './conversation.interface';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<Conversation>,
  ) {}

  async findAll(): Promise<Conversation[]> {
    return await this.conversationModel.find();
  }

  async findOne(id: string): Promise<Conversation> {
    return await this.conversationModel.findOne({ _id: id });
  }

  async create(conversation: Conversation): Promise<Conversation> {
    const newConversation = new this.conversationModel(conversation);
    return await newConversation.save();
  }

  async delete(id: string): Promise<Conversation> {
    return await this.conversationModel.findByIdAndRemove(id);
  }

  async findUserConversations(id: string): Promise<Conversation[]> {
    return await this.conversationModel.find({
      $or: [{ conversationCreatorId: id }, { conversationReceiverId: id }],
    });
  }

  async conversationExists(
    senderId: string,
    receiverId: string,
  ): Promise<{ exists: boolean; conversationId?: string }> {
    const conversation = await this.conversationModel.findOne({
      $or: [
        {
          conversationCreatorId: senderId,
          conversationReceiverId: receiverId,
        },
        {
          conversationCreatorId: receiverId,
          conversationReceiverId: senderId,
        },
      ],
    });

    if (conversation) {
      return { exists: true, conversationId: conversation._id };
    }
    return { exists: false };
  }
}
