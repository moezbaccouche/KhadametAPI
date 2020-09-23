import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { RequestsModule } from './requests/request.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './reviews/review.module';
import { ProfessionalSkillsModule } from './professionalSkills/professionalSkills.module';
import { SkillsModule } from './skills/skill.module';
import { UsersModule } from './users/user.module';
import { SkillRatingsModule } from './skillRatings/skillRatings.module';
import { ChatGateway } from './messages/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { MessagesModule } from './messages/message.module';
import { ConversationsModule } from './conversations/conversation.module';
import { ConversationMessagesModule } from './conversationMessages/conversationMessages.module';
import { NotificationsModule } from './notifications/notification.module';

@Module({
  imports: [
    UsersModule,
    RequestsModule,
    ProfessionalSkillsModule,
    SkillsModule,
    SkillRatingsModule,
    MessagesModule,
    ConversationsModule,
    ConversationMessagesModule,
    NotificationsModule,
    MongooseModule.forRoot(config.MongoURI),
    ConfigModule.forRoot(),
  ],
  controllers: [AlertController],
  providers: [ChatGateway, AlertGateway],
})
export class AppModule {}
