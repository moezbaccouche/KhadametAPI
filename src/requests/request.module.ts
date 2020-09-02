import { Module } from '@nestjs/common';
import { RequestsController } from './request.controller';
import { RequestsService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
