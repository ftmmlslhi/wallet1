import { Module } from "@nestjs/common";
import { BalanceLogRepository } from "./balancelog.repository";
import { BalanceLogService } from "./balancelog.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    providers:[BalanceLogService,BalanceLogRepository],
    imports: [PrismaModule],
    exports: [BalanceLogService]
})
export class BalanceLogmodule{

}