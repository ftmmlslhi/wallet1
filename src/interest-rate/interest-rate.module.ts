import { Module } from '@nestjs/common';
import { InterestRateService } from './interest-rate.service';
import { InterestRateController } from './interest-rate.controller';
import { InterestRateRepository } from './interest-rate.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [InterestRateController],
  providers: [InterestRateService, InterestRateRepository],
  imports: [PrismaModule],
  exports: [InterestRateService]
})
export class InterestRateModule {}
