import { Injectable } from '@nestjs/common';
import { CreateInterestRateDto } from './dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from './dto/update-interest-rate.dto';
import { InterestRateRepository } from './interest-rate.repository';

@Injectable()
export class InterestRateService {
  constructor(private readonly interestRateRepository : InterestRateRepository){}
  createIntrestRate(createInterestRateDto: CreateInterestRateDto) {
    return this.interestRateRepository.createIntrestRate(createInterestRateDto)
  }

  getAllInterestRates() {
    return this.interestRateRepository.getAllInterestRates();
  }

  getInterestRateByDuration(durationDay : number) {
    return this.interestRateRepository.getInterestRateByDuration(durationDay);
  }

  deleteInterestRates(id: number) {
    return this.interestRateRepository.deleteInterestRates(id)
  }
}
