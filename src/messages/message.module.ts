import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsModule } from 'src/conversations/conversation.module';
import { UsersModule } from 'src/users/user.module';
import { MessagesController } from './message.controller';
import { MessageSchema } from './message.schema';
import { MessagesService } from './message.service';

@Module({
  imports: [
    ConversationsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
