import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBankaccountDto {
    @IsString()
    @IsNotEmpty()
    account_number: string
    @IsNumber()
    @IsNotEmpty()
    cvv: number
    @IsNumber()
    @IsNotEmpty()
    iban: number
    @IsNumber()
    @IsNotEmpty()
    userId: number
}
