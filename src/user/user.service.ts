import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/login-user.dto';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository:UserRepository){}

  signup(usersCreateInput: Prisma.usersCreateInput) {
    return this.userRepository.signup(usersCreateInput)
  }

  signin(userLoginDto:UserLoginDto) {
    return this.userRepository.signin(userLoginDto)
  }

  async getBalance() {
    const accountsBalance = await this.userRepository.getBalance();  
    const newaccountsBalance = accountsBalance.map((account) => ({
      user_id: account.id,
      userBalance: account.userBalance,
    }));
    return newaccountsBalance;
  }

  async getBalanceById(id: number) {
    const userbalance = await this.userRepository.getBalanceById(id);
    const res = {
      userBalance: userbalance.userBalance,
      userId: userbalance.id,
    };    
    return res;
}
updateAccountBalance(id:number,newBalance : number){
  return this.userRepository.updateAccountBalance(id,newBalance)
}

}
