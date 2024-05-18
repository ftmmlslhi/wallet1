import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateDepositDto {
    @IsNumber()
    @IsNotEmpty()
    accountId: number
    @IsNumber()
    @IsNotEmpty()
    deposit: number
}
