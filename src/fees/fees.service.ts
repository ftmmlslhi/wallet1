import { Injectable } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { FeeRepository } from './fee.repository';

@Injectable()
export class FeesService {
  constructor(private readonly feeRepository: FeeRepository) { }
  addFee(createFeeDto: CreateFeeDto) {
    return this.feeRepository.addFee(createFeeDto)
  }

  getFee() {
    return this.feeRepository.getFee()
  }
}
