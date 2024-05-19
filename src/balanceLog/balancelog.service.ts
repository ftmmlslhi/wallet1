import { Injectable } from "@nestjs/common";
import { BalanceLogRepository } from "./balancelog.repository";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class BalanceLogService {
    constructor(private readonly balanceLogRepository: BalanceLogRepository) { }
    saveNightlyBalanceLog(accountId: number, userBalance: Decimal, cronRunTimeStamp: number) {
        return this.balanceLogRepository.saveNightlyBalanceLog(accountId, userBalance, cronRunTimeStamp)
    }
}