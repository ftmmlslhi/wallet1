import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { SettingRepository } from './setting.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [SettingController],
  providers: [SettingService,SettingRepository],
  imports: [PrismaModule],
  exports: [SettingRepository]
})
export class SettingModule {}

