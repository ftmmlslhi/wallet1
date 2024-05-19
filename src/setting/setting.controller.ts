import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {SettingService } from './setting.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@UseGuards(AuthGuard,RolesGuard)
@Controller('admin/fees')
export class SettingController {
  constructor(private readonly SettingService:SettingService) {}

  @Post()
  @Roles(Role.Admin)
  addFee(@Body() createFeeDto: CreateFeeDto) {
      return this.SettingService.addFee(createFeeDto);
  }

  @Get()
  @Roles(Role.Admin)
  getFee() {
      return this.SettingService.getFee();
  }
}
