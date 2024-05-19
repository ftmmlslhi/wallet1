import { Injectable } from "@nestjs/common";
import { nigthlyBalanceLog } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { prismaService } from "prisma/prisma.service";

@Injectable()
export class BalanceLogRepository {
  constructor(private readonly prisma: prismaService) { }
  async saveNightlyBalanceLog(userid: number, userBalance: Decimal, cronRunTimeStamp:number): Promise<nigthlyBalanceLog> {
    const res = await this.prisma.nigthlyBalanceLog.create({
      data: {
        userId: userid,
        balance :userBalance,
        logTimestamp : new Date(cronRunTimeStamp),
        created_at : new Date()
      },
    });
    return res;
  }

}