import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FeeRepository } from 'src/fees/fee.repository';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class DepositRepository {
  constructor(
    private readonly prisma: prismaService,
    private readonly feeRepository: FeeRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(dto: CreateDepositDto) {
    try {
      const getFee = (await this.feeRepository.getFee());
      const CurrentFee = getFee.fee
      console.log("getFee",getFee,typeof(CurrentFee));
      console.log("%",(Number(dto.deposit) * Number(getFee.fee)));
      
      const FinalAmount = Number(dto.deposit) - (Number(dto.deposit) * Number(getFee.fee));
      console.log("FinalAmount",FinalAmount);
      //EDITED
      const res = await this.prisma.transaction.create({
        data: {
          deposit: dto.deposit,
          transaction_date: new Date(),
          deposit_status: 'submit',
          currentFee: getFee.fee,
          finalAmount:FinalAmount,
          accounts: {
            connect: { id: dto.accountId },
          },
        },
      });
      return res;
    } catch (e) {
      throw new Error(`Failed to create bankaccount: ${e.message}`);
    }
  }

  async update(TrId: number,transactionUpdateInput: Prisma.transactionUpdateInput,transactionType:string) {
    console.log("TrId",TrId);
    
    try {
      //TODO at first check if the transaction is deposit
      const transactionType = await this.prisma.transaction.findUnique({
        where:{
          id: TrId
        }
      })
      console.log("transactionType",transactionType);
      
      const res = await this.prisma.transaction.update({
        data: {
          deposit_status: transactionUpdateInput.deposit_status,
        },
        where: {
          id: TrId,
        },
      });
      console.log("res",res);
      
      if ((transactionUpdateInput.deposit_status === 'confirm')) {
        //TODO update user balance
        // const updatebalanceDEP = await this.userRepository.updatebalanceDEP(
        //   res.account_id,
        //   res.deposit,
        //   transactionType
        // );
        // return {
        //   message: 'updated successfully',
        //   data: updatebalanceDEP,
        // };
      }
        return {
          message: 'updated successfully',
          data: res,
      }
    } catch (error) {
      console.error('Error updating section:', error);
      throw error;
    }
  }
}
