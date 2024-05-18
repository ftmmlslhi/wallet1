import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { Prisma } from '@prisma/client';

@Controller('')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post('withdrawal')
  @Roles(Role.Admin,Role.User)
  create(@Body() createWithdrawalDto: CreateWithdrawalDto) {
    return this.withdrawalService.create(createWithdrawalDto);
  }

  @Put('admin/withdrawal/:id/approve')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() withdravalUpdateInput: Prisma.transactionUpdateInput) {
    const transactionType = "withdrawal"
    return this.withdrawalService.update(+id, withdravalUpdateInput,transactionType);
  }
}
