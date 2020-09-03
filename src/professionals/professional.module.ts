import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professional.service';
import { ProfessionalsController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalSchema } from './professional.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professional', schema: ProfessionalSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '100s' },
      }),
    }),
  ],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class ProfessionalsModule {}
