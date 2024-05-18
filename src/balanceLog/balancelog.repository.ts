import { Injectable } from "@nestjs/common";
import { NightlyBalanceLog } from "@prisma/client";
import { prismaService } from "prisma/prisma.service";

    @Injectable()
    export class BalanceLogRepository{
        constructor(private readonly prisma: prismaService) {}

        async saveNightlyBalanceLog(accountId: number, loggedBalance: number): Promise<NightlyBalanceLog> {
            const res = await this.prisma.nightlyBalanceLog.create({
              data: {
                accountId,
                loggedBalance,
              },
            });
            return res;
            
          }
        
    }