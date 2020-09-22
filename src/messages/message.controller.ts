import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ConversationOverviewDto } from './DTOs/conversationOverview.dto';
import { Message } from './message.interface';
import { MessagesService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('')
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() newMessage: Message): Promise<Message> {
    return this.messagesService.create(newMessage);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Message> {
    return this.messagesService.delete(id);
  }

  @Get('conversations/:id')
  findConversationMessages(@Param('id') id: string): Promise<Message[]> {
    return this.messagesService.findConversationMessages(id);
  }

  @Get('conversations/overview/:id')
  getUserConversationsOverview(
    @Param('id') id: string,
  ): Promise<ConversationOverviewDto[]> {
    return this.messagesService.getUserConversationsOverview(id);
  }
}
