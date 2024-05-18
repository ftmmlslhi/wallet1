import { Injectable } from "@nestjs/common";
import { BalanceLogRepository } from "./balancelog.repository";

    @Injectable()
    export class BalanceLogService{
        constructor(private readonly balanceLogRepository : BalanceLogRepository){}
        saveNightlyBalanceLog(accountId: number, loggedBalance: number){
            return this.balanceLogRepository.saveNightlyBalanceLog(accountId,loggedBalance)
        }
    }