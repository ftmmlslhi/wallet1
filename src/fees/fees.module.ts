import { Module } from '@nestjs/common';
import { FeesService } from './fees.service';
import { FeesController } from './fees.controller';
import { FeeRepository } from './fee.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [FeesController],
  providers: [FeesService,FeeRepository],
  imports: [PrismaModule],
  exports: [FeeRepository]
})
export class FeesModule {}

