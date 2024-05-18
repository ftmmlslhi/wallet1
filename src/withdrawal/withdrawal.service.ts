import { Injectable } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { WithdrawalRepository } from './withdrawal.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class WithdrawalService {
  constructor(private readonly withdrawalRepository:WithdrawalRepository){}
  create(createWithdrawalDto: CreateWithdrawalDto) {    
    return this.withdrawalRepository.create(createWithdrawalDto)
  }

  update(id: number, withdravalUpdateInput: Prisma.transactionUpdateInput,transactionType:String) {
    return this.withdrawalRepository.update(id,withdravalUpdateInput,transactionType)
  }

}
