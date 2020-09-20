import { Module } from '@nestjs/common';
import { RequestsController } from './request.controller';
import { RequestsService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.schema';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
