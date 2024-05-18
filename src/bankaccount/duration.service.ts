import { Injectable } from '@nestjs/common';
import { BankaccountService } from './bankaccount.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InterestRateService } from 'src/interest-rate/interest-rate.service';
import { BalanceLogService } from 'src/balanceLog/balancelog.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class DurationService {
  constructor(private accountService: BankaccountService,private userService: UserService,private readonly interestrateService: InterestRateService, private readonly balanceLogService: BalanceLogService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CronExpression.EVERY_10_SECONDS) 
  async calculateAccountDurations(): Promise<void> {
    const accounts = await this.accountService.getUserAccounts();    
    const currentDate = new Date();

    for (const account of accounts) {
      const userId = account.userId;
      const openedDate = new Date(account.opened_date);      
      const millisecondsInADay = 1000 * 60 * 60 * 24;
      const durationInDays = Math.floor((currentDate.getTime() - openedDate.getTime()) / millisecondsInADay);

      const interestRate = await this.interestrateService.getInterestRateByDuration(durationInDays);
      const getBalance = await this.userService.getBalanceById(userId)
      
      const balance = getBalance.userBalance
      if (interestRate) {
        const interestAmount = (Number(balance) * Number(interestRate.rate)) / 100;
        const updatedBalance = Number(balance) + interestAmount;
        await this.userService.updateAccountBalance(userId, updatedBalance);
        await this.balanceLogService.saveNightlyBalanceLog(account.id,updatedBalance)
      }
    }
  }
  
}
