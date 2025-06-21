import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentsModule } from '../payments/payments.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [AuthModule, PaymentsModule, MembersModule],
  controllers: [],
})
export class AppModule { }
