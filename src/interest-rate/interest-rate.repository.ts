import { Injectable } from "@nestjs/common";
import { prismaService } from "prisma/prisma.service";
import { Prisma, interest_rate } from "@prisma/client";
import { CreateInterestRateDto } from "./dto/create-interest-rate.dto";

@Injectable()
export class InterestRateRepository{
    constructor(private prisma: prismaService) {}

    async createIntrestRate(createInterestRateDto:CreateInterestRateDto):Promise<interest_rate>{
        const res =  await this.prisma.interest_rate.create({
            data:{
                rate: createInterestRateDto.rate,
                duration_days:createInterestRateDto.durationDays
            }})
        return res
    }

    async getAllInterestRates(): Promise<interest_rate[]> {
        return await this.prisma.interest_rate.findMany({ });
    }
    
    async getInterestRateByDuration(durationDay:number): Promise<interest_rate> {        
        const res = await this.prisma.interest_rate.findFirst({
            where :{
                duration_days : durationDay
            }
         });         
         return res
    } 
    
    async deleteInterestRates(id:number): Promise<interest_rate> {
        return await this.prisma.interest_rate.delete({
            where :{
                id : id
            }
         });
    }
}