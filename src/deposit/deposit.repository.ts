import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FeeRepository } from 'src/fees/fee.repository';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UserRepository } from 'src/user/user.repository';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DepositRepository {
    constructor(private readonly prisma: prismaService, private readonly feeRepository: FeeRepository,
      private readonly userRepository: UserRepository,
    ) { }
  async create(dto: CreateDepositDto) {
    try {
      const getFee = (await this.feeRepository.getFee());
      const CurrentFee = getFee.fee

      const deposit = new Decimal(dto.deposit);
      const fee = new Decimal(CurrentFee);
      const FinalAmount = deposit.minus(deposit.times(fee));
      
      const res = await this.prisma.transaction.create({
        data: {
          deposit: dto.deposit,
          transaction_date: new Date(),
          deposit_status: 'submit',
          currentFee: getFee.fee,
          finalAmount: FinalAmount,
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

  async update(TrId: number, transactionUpdateInput: Prisma.transactionUpdateInput) {
    try {
      const checktransactionType = await this.prisma.transaction.findUnique({
        where: {
          id: TrId
        }
      })
      //check if there is deposit
      if (new Decimal(checktransactionType.deposit).greaterThan(0)) {
        //if reject
        const res = await this.prisma.transaction.update({
          data: {
            deposit_status: transactionUpdateInput.deposit_status,
          },
          where: {
            id: TrId,
          },
          include: {
            accounts: {
              select: {
                id: true,
                user: {
                  select: {
                    id: true
                  }
                }
              }

            }
          }
        });
        if ((transactionUpdateInput.deposit_status === 'confirm')) {
          const updatebalanceDEP = await this.userRepository.updatebalanceDEP(
            res.account_id,
            res.accounts.user.id,
            res.finalAmount,
          );
          return {
            message: 'updated successfully',
            data: updatebalanceDEP,
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
