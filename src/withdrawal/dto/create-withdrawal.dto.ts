import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWithdrawalDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;
  @IsNumber()
  @IsNotEmpty()
  withdrawal: number;
}
