import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { BankaccountModule } from './bankaccount/bankaccount.module';
import { InterestRateModule } from './interest-rate/interest-rate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BalanceLogmodule } from './balanceLog/balancelog.module';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { DurationService } from './cronjob/duration.service';

@Module({
  imports: [
    UserModule,
    SettingModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    BankaccountModule,
    InterestRateModule,
    BalanceLogmodule,
    ScheduleModule.forRoot(),
    DepositModule,
    WithdrawalModule,
  ],
  controllers: [AppController],
  providers: [AppService,DurationService],
})
export class AppModule {}
