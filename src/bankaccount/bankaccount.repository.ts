import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateBankaccountDto } from './dto/create-bankaccount.dto';
import { Prisma, accounts } from '@prisma/client';

@Injectable()
export class BankaccountRepository {
  //EDITED/
  constructor(private readonly prisma: prismaService) {}
  async create(createBankaccountDto: CreateBankaccountDto) {
    try {
      const res = await this.prisma.accounts.create({
        data: {
          account_number: createBankaccountDto.account_number,
          cvv: createBankaccountDto.cvv,
          iban: createBankaccountDto.iban,
          opened_date: new Date(),
          created_at: new Date(),
          user:{
            connect:{
              id : createBankaccountDto.userId,
            }
          }
        },
      });      
      return res;
    } catch (e) {
      throw new Error(`Failed to create bankaccount: ${e.message}`);
    }
  }


  // //EDITED//check in cron job
  // async getUserAccounts(): Promise<any[]> {
  //   const results = await this.prisma.accounts.findMany({
  //     include: { user: {
  //       select : {
  //         id :true
  //       }
  //     } }
  //   });
  //   const customRes = results.map((result)=>({
  //     id: result.id,
  //     iban: result.iban,
  //     account_number: result.account_number,
  //     cvv: result.cvv,
  //     opened_date: result.opened_date,
  //     created_at: result.created_at,
  //     userId: result.user[0].id,
  //   }))        
  //   return customRes
  // }

  //EDITED/
  async findOne(id: number) {
    try {      
      const res = this.prisma.accounts.findUnique({
        where: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.error('Error findOne account:', error);
      throw new Error('Database error occurred while get balance.');
    }
  }

  
}
