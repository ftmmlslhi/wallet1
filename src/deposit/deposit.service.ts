import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { DepositRepository } from './deposit.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}
  create(createDepositDto: CreateDepositDto) {
    return this.depositRepository.create(createDepositDto);
  }

  update(TrId: number, transactionUpdateInput: Prisma.transactionUpdateInput,transactionType:string) {
    return this.depositRepository.update(TrId,transactionUpdateInput,transactionType);
  }
}
