import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professional.service';
import { ProfessionalsController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSchema } from './professional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professional', schema: ProfessionalSchema },
    ]),
  ],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class ProfessionalsModule {}
