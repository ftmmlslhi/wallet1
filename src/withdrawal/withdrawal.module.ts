import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalRepository } from './withdrawal.repository';
import { PrismaModule } from 'prisma/prisma.module';
import { UserRepository } from 'src/user/user.repository';
import { FeeRepository } from 'src/fees/fee.repository';

@Module({
  controllers: [WithdrawalController],
  providers: [WithdrawalService,WithdrawalRepository,FeeRepository,UserRepository],
  imports: [PrismaModule]
})
export class WithdrawalModule {}
