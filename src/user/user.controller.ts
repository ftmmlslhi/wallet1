import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto } from './dto/login-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  signup(@Body() usersCreateInput: Prisma.usersCreateInput) {
    return this.userService.signup(usersCreateInput);
  }

  @Post('auth/signin')
  signin(@Body() usersCreateInput: UserLoginDto) {
    return this.userService.signin(usersCreateInput);
  }



  @Get('/userbalance')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  getBalance() {
      return this.userService.getBalance();
  }


  @Get('/balance')
  @Roles(Role.Admin,Role.User)
  @UseGuards(AuthGuard,RolesGuard)
  getBalanceById(@Body() req: any) {
    const id = req.userId;
    return this.userService.getBalanceById(id);
  }



}
