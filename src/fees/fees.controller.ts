import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FeesService } from './fees.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@UseGuards(AuthGuard,RolesGuard)
@Controller('admin/fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Post()
  @Roles(Role.Admin)
  addFee(@Body() createFeeDto: CreateFeeDto) {
      return this.feesService.addFee(createFeeDto);
  }

  @Get()
  @Roles(Role.Admin)
  getFee() {
      return this.feesService.getFee();
  }
}
