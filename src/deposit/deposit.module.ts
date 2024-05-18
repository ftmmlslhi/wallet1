import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { DepositRepository } from './deposit.repository';
import { PrismaModule } from 'prisma/prisma.module';
import { FeeRepository } from 'src/fees/fee.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [DepositController],
  providers: [DepositService,DepositRepository,FeeRepository,UserRepository],
  imports: [PrismaModule]
})
export class DepositModule {}
