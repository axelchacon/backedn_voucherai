import { Module } from '@nestjs/common';
import { VouchersModule } from './vouchers/vouchers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [VouchersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
