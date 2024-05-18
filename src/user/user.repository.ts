import { Injectable } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto } from './dto/login-user.dto';
import { hash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: prismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(usersInput: Prisma.userCreateInput) {
    try {
      const userData = {
        lastName: usersInput.lastName,
        firstName: usersInput.firstName,
        mobile_number: usersInput.mobile_number,
        username: usersInput.username,
        email: usersInput.email,
        password: hash('md5', usersInput.password),
        created_at: new Date(),
        updated_at: new Date(),
        role: usersInput.role,
      };
      //EDITED/
      const user = await this.prisma.user.create({
        data: userData,
      });
      return user;
    } catch (error) {
      console.error('Error createting user:', error);
      throw error;
    }
  }

  //EDITED/
  async signin(userLoginDto: UserLoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: userLoginDto.username,
          password: hash('md5', userLoginDto.password),
          email: userLoginDto.email,
        },
      });
      if (!user) {
        return 'user not found!';
      }
      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };
      const access_token = await this.jwtService.signAsync(payload);

      const res = {
        user: user,
        access_token: access_token,
      };
      return res;
    } catch (e) {
      console.error('Error in login:', e);
      throw e;
    }
  }

  async updatebalanceDEP(
    accountId: number,
    depo: Decimal,
    transactionType: String,
  ) {
  //   try {
  //     //EDITED checck in duration
  //     const res = await this.prisma.accounts.findUnique({
  //       where: { id: accountId },
  //       include: {
  //         user: {
  //           // select: {
  //           //   id: true,
  //           // },
  //         },
  //       },
  //     });

  //     const userId = res.user_account[0].users.id;
  //     const currentBalance = res.user_account[0].users.userBalance;
  //     const newBalance = Number(currentBalance) + Number(depo);
  //     const updateUserId = await this.prisma.user.update({
  //       where: {
  //         id: userId,
  //       },
  //       data: {
  //         userBalance: newBalance,
  //       },
  //     });
  //     return updateUserId;
  //   } catch (e) {
  //     console.error('Error in login:', e);
  //     throw e;
  //   }
  }

  async getBalance() {
    //EDITED/
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          userBalance: true,
        },
      });
    } catch (e) {
      console.error('Error fin find balance', e);
      throw new Error('Database error occurred while creating balance.');
    }
  }

  async getBalanceById(userid: number) {
    try {
      //EDITED/
      const res = await this.prisma.user.findUnique({
        where: {
          id: userid,
        },
        select: {
          userBalance: true,
          id: true,
        },
      });
      if (!res) {
        throw new Error('user not found.');
      }
      return res;
    } catch (e) {
      console.log(e);
      throw new Error('Database error occurred while get balance.');
    }
  }

  //EDITED //check with duration
  async updateAccountBalance(id:number,newBalance : number){
    try{
      const res = await this.prisma.user.update({
        where:{
          id:id,
        },
        data:{
          userBalance:newBalance
        }
      })
      console.log("update successfully");
      return res
    }
    catch(e){
      console.log(e)
      throw new Error('Database error occurred while update balance.');
    }
}

  async updatebalanceWID(
    accountId: number,
    wid: Decimal,
    transactionType: String,
  ) {
    try {
      //EDITED
      // const res = await this.prisma.accounts.findUnique({
      //   where: { id: accountId },
      //   include: {
      //     user_account: {
      //       select: {
      //         users: true,
      //       },
      //     },
      //   },
      // });

      // const userId = res.user_account[0].users.id;
      // const currentBalance = res.user_account[0].users.userBalance;
      // const newBalance = Number(currentBalance) - Number(wid);
      // const updateUserId = await this.prisma.users.update({
      //   where: {
      //     id: userId,
      //   },
      //   data: {
      //     userBalance: newBalance,
      //   },
      // });
      // return updateUserId;
    } catch (e) {
      console.error('Error in login:', e);
      throw e;
    }
  }
}
