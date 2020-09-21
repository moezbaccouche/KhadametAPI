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
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';

@Module({
  imports: [
    UsersModule,
    RequestsModule,
    ProfessionalSkillsModule,
    SkillsModule,
    SkillRatingsModule,
    MongooseModule.forRoot(config.MongoURI),
    ConfigModule.forRoot(),
  ],
  controllers: [AlertController],
  providers: [ChatGateway, AlertGateway],
})
export class AppModule {}
