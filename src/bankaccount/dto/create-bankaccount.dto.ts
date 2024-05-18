import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBankaccountDto {
    @IsString()
    @IsNotEmpty()
    account_number: string
    // @IsNumber()
    // @IsString()
    // @IsNotEmpty()
    // balance: number | string
    @IsNumber()
    @IsNotEmpty()
    cvv: number
    @IsNumber()
    @IsNotEmpty()
    iban: number
    @IsNumber()
    @IsNotEmpty()
    user_account: number
}
