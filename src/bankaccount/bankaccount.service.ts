import { Injectable, UseGuards } from '@nestjs/common';
import { CreateBankaccountDto } from './dto/create-bankaccount.dto';
import { BankaccountRepository } from './bankaccount.repository';

@Injectable()
export class BankaccountService {
  constructor(private readonly bankaccountRepository: BankaccountRepository) {}

  create(createBankaccountDto: CreateBankaccountDto) {
    return this.bankaccountRepository.create(createBankaccountDto);
  }

  getUserAccounts() {
    return this.bankaccountRepository.getUserAccounts();
  }

  findOne(id: number) {
    return this.bankaccountRepository.findOne(id);
  }

}
