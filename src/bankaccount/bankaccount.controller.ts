import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BankaccountService } from './bankaccount.service';
import { CreateBankaccountDto } from './dto/create-bankaccount.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/role/role.guard';

export interface idinterface {
  id: number;
}

@UseGuards(AuthGuard,RolesGuard)
@Controller()
export class BankaccountController {
  constructor(private readonly bankaccountService: BankaccountService) {}

  @Post('bankaccount')
  @Roles(Role.Admin,Role.User)
  create(@Body() createBankaccountDto: CreateBankaccountDto) {
    return this.bankaccountService.create(createBankaccountDto);
  }

  @Get('bankaccount/:id')
  @Roles(Role.Admin,Role.User)
  findOne(@Param('id') id: string) {
      return this.bankaccountService.findOne(+id);
  }
}
