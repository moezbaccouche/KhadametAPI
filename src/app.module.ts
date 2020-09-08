import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { ProfessionalsModule } from './professionals/professional.module';
import config from './config/keys';
import { RequestsModule } from './requests/request.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './reviews/review.module';
import { ProfessionalSkillsModule } from './professionalSkills/professionalSkills.module';
import { SkillsModule } from './skills/skill.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    ClientsModule,
    ProfessionalsModule,
    UsersModule,
    RequestsModule,
    ReviewsModule,
    ProfessionalSkillsModule,
    SkillsModule,
    MongooseModule.forRoot(config.MongoURI),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
