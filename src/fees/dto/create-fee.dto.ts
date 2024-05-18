import { Decimal } from "@prisma/client/runtime/library"
import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeeDto {
    @IsNumber()
    @IsNotEmpty()
    id:number;
    @IsDecimal()
    @IsNotEmpty()
    fee:Decimal;
    @IsNumber()
    @IsNotEmpty()
    userId: number
}
