import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestRateDto } from './create-interest-rate.dto';

export class UpdateInterestRateDto extends PartialType(CreateInterestRateDto) {}
