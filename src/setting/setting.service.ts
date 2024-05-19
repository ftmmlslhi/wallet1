import { Injectable } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { SettingRepository } from './setting.repository';

@Injectable()
export class SettingService {
  constructor(private readonly settingRepository: SettingRepository) { }
  addFee(createFeeDto: CreateFeeDto) {
    return this.settingRepository.addFee(createFeeDto)
  }

  getFee() {
    return this.settingRepository.getFee()
  }
}
