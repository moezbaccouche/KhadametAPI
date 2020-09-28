import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { RequestsModule } from './requests/request.module';
import { ConfigModule } from '@nestjs/config';
import { ProfessionalSkillsModule } from './professionalSkills/professionalSkills.module';
import { SkillsModule } from './skills/skill.module';
import { UsersModule } from './users/user.module';
import { SkillRatingsModule } from './skillRatings/skillRatings.module';
import { ChatGateway } from './messages/chat.gateway';
import { MessagesModule } from './messages/message.module';
import { ConversationsModule } from './conversations/conversation.module';
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
    NotificationsModule,
    MongooseModule.forRoot(config.MongoURI),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
