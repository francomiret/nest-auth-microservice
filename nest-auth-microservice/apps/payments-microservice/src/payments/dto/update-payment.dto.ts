import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
