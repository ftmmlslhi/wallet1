import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FeeRepository } from 'src/fees/fee.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WithdrawalRepository {
  constructor(
    private readonly prisma: prismaService,
    private readonly feeRepository: FeeRepository,
    private readonly userRepository: UserRepository,
  ) { }
  async create(createWithdrawalDto: CreateWithdrawalDto) {
    try {
      const getFee = (await this.feeRepository.getFee());
      const withdrawal = new Decimal(createWithdrawalDto.withdrawal);
      const CurrentFee = new Decimal(getFee.fee);
      const FinalAmount = withdrawal.plus(withdrawal.times(CurrentFee));
      const getbalance = await this.prisma.accounts.findUnique({
        where: {
          id: createWithdrawalDto.accountId
        },
        include: {
          user: {
            select: {
              id: true,
              userBalance: true
            }
          }
        },

      });

      const currentUserBalance = getbalance.user.userBalance;
      const newBalance = new Decimal(currentUserBalance).minus(FinalAmount);
      //check if the balance is - or not
      if (new Decimal(newBalance).greaterThan(0)) {
        const res = await this.prisma.transaction.create({
          data: {
            withdrawal: createWithdrawalDto.withdrawal,
            transaction_date: new Date(),
            withdrawal_status: 'submit',
            currentFee: CurrentFee,
            finalAmount: FinalAmount,
            accounts: {
              connect: { id: createWithdrawalDto.accountId },
            },
          },
        });
        return res;
      }
      else {
        return "insuficiente user balance!"
      }
    } catch (e) {
      throw new Error(`Failed to create bankaccount: ${e.message}`);
    }
  }

  async update(WdId: number, transactionUpdateInput: Prisma.transactionUpdateInput) {
    try {
      //check transaction type
      const checktransactionType = await this.prisma.transaction.findUnique({
        where: {
          id: WdId
        }
      })
      if (new Decimal(checktransactionType.withdrawal).greaterThan(0)) {
        const res = await this.prisma.transaction.update({
          data: {
            deposit_status: transactionUpdateInput.deposit_status,
          },
          where: {
            id: WdId,
          },
          include:{
            accounts:{
              select:{
                id : true,
                user:{
                  select:{
                    id:true
                  }
                }
              }

            }
          }
        }); 

        if ((transactionUpdateInput.withdrawal_status === 'approve')) {
          const updateBalanceWID = await this.userRepository.updatebalanceWID(
            res.account_id,
            res.finalAmount,
            res.accounts.user.id,
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
      }
      else {
        return { message: 'not deposit type' }
      }
    } catch (error) {
      console.error('Error updating section:', error);
      throw error;
    }
  }
}
