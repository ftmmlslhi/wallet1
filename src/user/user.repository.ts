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
  ) { }

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

  async updatebalanceDEP(accountId: number, userId: number, depo: Decimal) {
    console.log(userId, accountId, depo);
    try {
      const currentBalance = await this.prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          userBalance: true
        }
      })
      const newBalance = new Decimal(currentBalance.userBalance).plus(depo);
      const updateUserId = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          updated_at: new Date(),
          userBalance: newBalance,
        },
      });
      return updateUserId
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getBalance() {
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

  async updatebalanceWID(accountId: number, wid: Decimal, userId: number,) {
    try {
      const currentBalance = await this.prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          userBalance: true
        }
      })

      const newBalance = new Decimal(currentBalance.userBalance).minus(wid);
      console.log(userId, accountId, wid, currentBalance.userBalance, newBalance);
      const updateByUserId = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          updated_at: new Date(),
          userBalance: newBalance,
        },
      });
      console.log("updateByUserId", updateByUserId);
      return updateByUserId
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  //EDITED//check in cron job
  async getUserAccounts(): Promise<any[]> {
    const results = await this.prisma.user.findMany({
      select: { 
        id:true,
        userBalance : true,
        updated_at : true
      } 
    });
    
    return results
  }
  
  //EDITED //check with duration
  async updateAccountBalance(id: number, newBalance: number) {
    try {
      const res = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          userBalance: newBalance
        }
      })
      console.log("update successfully");
      return res
    }
    catch (e) {
      console.log(e)
      throw new Error('Database error occurred while update balance.');
    }
  }
}
