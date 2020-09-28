import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationsService } from 'src/conversations/conversation.service';
import { UserDto } from 'src/users/DTOs/user.dto';
import { UsersService } from 'src/users/user.service';
import { ConversationOverviewDto } from './DTOs/conversationOverview.dto';
import { Message } from './message.interface';
import { LastMessageDto } from './DTOs/lastMessage.dto';
import { UserForConversationDto } from 'src/users/DTOs/userForConversation.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Message>,
    private readonly conversationsService: ConversationsService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Message[]> {
    return await this.messageModel.find();
  }

  async findOne(id: string): Promise<Message> {
    return await this.messageModel.findOne({ id });
  }

  async create(message: Message): Promise<Message> {
    console.log('MESSAGE', message);
    const newMessage = new this.messageModel(message);
    return await newMessage.save();
  }

  async delete(id: string): Promise<Message> {
    return await this.messageModel.findByIdAndRemove(id);
  }

  async findConversationMessages(id: string): Promise<Message[]> {
    return await this.messageModel
      .find({ conversationId: id })
      .sort({ createdAt: -1 });
  }

  async getUserConversationsOverview(
    id: string,
  ): Promise<ConversationOverviewDto[]> {
    const conversations = await this.conversationsService.findUserConversations(
      id,
    );

    let conversationsOverview: ConversationOverviewDto[] = [];
    await Promise.all(
      conversations.map(async conversation => {
        const creator = await this.usersService.findOne(
          conversation.conversationCreatorId,
        );
        const receiver = await this.usersService.findOne(
          conversation.conversationReceiverId,
        );

        let receiverUser: UserForConversationDto = null;
        if (creator.id !== id) {
          receiverUser = new UserForConversationDto(
            creator.id,
            creator.name,
            creator.picture,
            creator.playerId,
          );
        }

        if (receiver.id !== id) {
          receiverUser = new UserForConversationDto(
            receiver.id,
            receiver.name,
            receiver.picture,
            receiver.playerId,
          );
        }

        const lastMessage = await this.messageModel
          .findOne({ conversationId: conversation.id })
          .sort({ createdAt: -1 })
          .limit(1);

        const lastMessageDto = new LastMessageDto(
          lastMessage.senderId,
          lastMessage.msg,
          lastMessage.createdAt,
        );
        conversationsOverview.push(
          new ConversationOverviewDto(
            receiverUser,
            lastMessageDto,
            conversation.id,
          ),
        );
      }),
    );
    return conversationsOverview.sort((a, b) =>
      this.compareDates(a.lastMessage.msgTime, b.lastMessage.msgTime),
    );
  }

  private compareDates(date1: Date, date2: Date) {
    if (date1 > date2) {
      return -1;
    }
    if (date1 < date2) {
      return 1;
    }
    return 0;
  }
}
