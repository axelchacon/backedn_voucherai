import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VouchersController],
  providers: [VouchersService, PrismaService],
})
export class VouchersModule {}
