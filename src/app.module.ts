import { Module } from '@nestjs/common';
import { VouchersModule } from './vouchers/vouchers.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [VouchersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
