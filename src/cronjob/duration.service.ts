import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InterestRateService } from 'src/interest-rate/interest-rate.service';
import { BalanceLogService } from 'src/balanceLog/balancelog.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { timeStamp } from 'console';

@Injectable()
export class DurationService {
  constructor(private userService: UserService,private readonly interestrateService: InterestRateService, private readonly balanceLogService: BalanceLogService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CfeeronExpression.EVERY_10_SECONDS)
  async calculateAccountDurations(): Promise<void> {
    const now: number = Date.now();
    const cronRunTimeStamp: number = Math.floor(now) 
    const usersBalances = await this.userService.getUserAccounts(); 
    for (const usersBalance of usersBalances) {
        await this.balanceLogService.saveNightlyBalanceLog(usersBalance.id,usersBalance.userBalance,cronRunTimeStamp)
      }
    }
  }

