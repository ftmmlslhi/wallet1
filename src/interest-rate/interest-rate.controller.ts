import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InterestRateService } from './interest-rate.service';
import { CreateInterestRateDto } from './dto/create-interest-rate.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('rate')
export class InterestRateController {
  constructor(private readonly interestRateService: InterestRateService) {}

  @Post()
  @Roles(Role.Admin)
  createIntrestRate(@Body() createInterestRateDto: CreateInterestRateDto) {
    return this.interestRateService.createIntrestRate(createInterestRateDto);
  }

  @Get()
  @Roles(Role.Admin)
  getAllInterestRates() {
      return this.interestRateService.getAllInterestRates();
  }

  @Delete(':id')
  @Roles(Role.Admin)
  deleteInterestRates(@Param('id') id: number) {
      return this.interestRateService.deleteInterestRates(+id);
  }
}
