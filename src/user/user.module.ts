import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService,UserRepository],
  imports: [PrismaModule],
  exports:[UserService]
})

export class UserModule {}
