import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { get } from 'http';
import { ConversationMessage } from './conversationMessages.interface';
import { ConversationMessagesService } from './conversationMessages.service';

@Controller('conversationMessages')
export class ConversationMessagesController {
  constructor(
    private readonly conversationMessagesService: ConversationMessagesService,
  ) {}

  @Get('')
  findAll(): Promise<ConversationMessage[]> {
    return this.conversationMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ConversationMessage> {
    return this.conversationMessagesService.findOne(id);
  }

  @Post()
  create(
    @Body() newConversationMessage: ConversationMessage,
  ): Promise<ConversationMessage> {
    return this.conversationMessagesService.create(newConversationMessage);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ConversationMessage> {
    return this.conversationMessagesService.delete(id);
  }

  @Get('conversations/:id')
  findConversationMessages(
    @Param('id') id: string,
  ): Promise<ConversationMessage[]> {
    return this.conversationMessagesService.findConversationMessage(id);
  }
}
