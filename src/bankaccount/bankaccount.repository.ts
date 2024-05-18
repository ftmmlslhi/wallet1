import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateBankaccountDto } from './dto/create-bankaccount.dto';
import { account } from '@prisma/client';

@Injectable()
export class BankaccountRepository {
  constructor(private readonly prisma: prismaService) {}

  async create(createBankaccountDto: CreateBankaccountDto) {
    try {
      const res = await this.prisma.account.create({
        data: {
          account_number: createBankaccountDto.account_number,
          cvv: createBankaccountDto.cvv,
          iban: createBankaccountDto.iban,
          opened_date: new Date(),
          created_at: new Date(),
          user_account: {
            create: {
              users: {
                connect: {
                  id: createBankaccountDto.user_account,
                },
              },
            },
          },
        },
      });

      return res;
    } catch (e) {
      throw new Error(`Failed to create bankaccount: ${e.message}`);
    }
  }

  async getUserAccounts(): Promise<any[]> {
    const results = await this.prisma.account.findMany({
      include: { user_account: {
        select : {
          user_id :true
        }
      } }
    });
    const customRes = results.map((result)=>({
      id: result.id,
      iban: result.iban,
      account_number: result.account_number,
      cvv: result.cvv,
      opened_date: result.opened_date,
      created_at: result.created_at,
      userId: result.user_account[0].user_id,
    }))        
    return customRes
  }

  async findOne(id: number) {
    try {
      const res = this.prisma.account.findUnique({
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
