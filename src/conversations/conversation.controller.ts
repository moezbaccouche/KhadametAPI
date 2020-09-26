import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { Conversation } from './conversation.interface';
import { ConversationsService } from './conversation.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get('')
  findAll(): Promise<Conversation[]> {
    return this.conversationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Conversation> {
    return this.conversationsService.findOne(id);
  }

  @Post()
  create(@Body() newConversation: Conversation): Promise<Conversation> {
    return this.conversationsService.create(newConversation);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Conversation> {
    return this.conversationsService.delete(id);
  }

  @Get('users/:id')
  findUserConversations(@Param('id') id: string): Promise<Conversation[]> {
    return this.conversationsService.findUserConversations(id);
  }

  @Get('users/:senderId/:receiverId')
  conversationExists(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ): Promise<{ exists: boolean; conversationId?: string }> {
    return this.conversationsService.conversationExists(senderId, receiverId);
  }
}
