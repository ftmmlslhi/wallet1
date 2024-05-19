import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Prisma } from '@prisma/client';

@Controller()
@UseGuards(AuthGuard,RolesGuard)
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('deposit')
  @Roles(Role.Admin,Role.User)
  create(@Body() createDepositDto: CreateDepositDto) {
    return this.depositService.create(createDepositDto);
  }

  @Put('admin/deposits/:id/confirm')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() transactionUpdateInput: Prisma.transactionUpdateInput) {
    return this.depositService.update(+id, transactionUpdateInput);
  }
}
