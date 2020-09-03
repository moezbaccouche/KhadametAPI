import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { ProfessionalsModule } from './professionals/professional.module';
import config from './config/keys';
import { RequestsModule } from './requests/request.module';

@Module({
  imports: [
    ClientsModule,
    ProfessionalsModule,
    RequestsModule,
    MongooseModule.forRoot(config.MongoURI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
