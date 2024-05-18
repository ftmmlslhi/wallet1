import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FeeRepository } from 'src/fees/fee.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';

@Injectable()
export class WithdrawalRepository {
  constructor(
    private readonly prisma: prismaService,
    private readonly feeRepository: FeeRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async create(createWithdrawalDto: CreateWithdrawalDto) {
    try {      
      const getFee = await this.feeRepository.getFee();
      const amountFee = Number(createWithdrawalDto.withdrawal) + Number(getFee.fee);      
      const res = await this.prisma.transaction.create({
        data: {
          withdrawal: amountFee,
          transaction_date: new Date(),
          withdrawal_status: 'submit',
          account: {
            connect: { id: createWithdrawalDto.accountId },
          },
        },
      });
      return res;
    } catch (e) {
      throw new Error(`Failed to create bankaccount: ${e.message}`);
    }
  }

  async update(WdId: number,transactionUpdateInput: Prisma.transactionUpdateInput,transactionType:String) {
    try {
      const res = await this.prisma.transaction.update({
        data: {
          withdrawal_status: transactionUpdateInput.withdrawal_status,
        },
        where: {
          id: WdId,
        },
      });
            
      if ((transactionUpdateInput.withdrawal_status === 'approve')) {
        const updateBalanceWID = await this.userRepository.updatebalanceWID(
          res.account_id,
          res.withdrawal,
          transactionType
        );
        return {
          message: 'updated successfully',
          data: updateBalanceWID,
        };
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
