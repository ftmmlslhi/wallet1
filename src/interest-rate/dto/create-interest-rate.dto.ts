import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateInterestRateDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    durationDays: number;
    @IsNotEmpty()
    @IsNumber()
    rate: number;
}
