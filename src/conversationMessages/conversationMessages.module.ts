import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationMessagesController } from './conversationMessages.controller';
import { ConversationMessageSchema } from './conversationMessages.schema';
import { ConversationMessagesService } from './conversationMessages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ConversationMessage', schema: ConversationMessageSchema },
    ]),
  ],
  controllers: [ConversationMessagesController],
  providers: [ConversationMessagesService],
})
export class ConversationMessagesModule {}
