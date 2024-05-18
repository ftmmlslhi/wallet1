import { Module } from '@nestjs/common';
import { BankaccountService } from './bankaccount.service';
import { BankaccountController } from './bankaccount.controller';
import { BankaccountRepository } from './bankaccount.repository';
import { PrismaModule } from 'prisma/prisma.module';
import { DurationService } from './duration.service';
import { InterestRateModule } from 'src/interest-rate/interest-rate.module';
import { BalanceLogService } from 'src/balanceLog/balancelog.service';
import { BalanceLogRepository } from 'src/balanceLog/balancelog.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BankaccountController],
  providers: [BankaccountService,BankaccountRepository,DurationService,BalanceLogService,BalanceLogRepository],
  imports: [PrismaModule,InterestRateModule,UserModule]
})
export class BankaccountModule {}
