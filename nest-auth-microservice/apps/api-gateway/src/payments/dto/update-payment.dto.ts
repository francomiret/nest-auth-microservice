import { CreatePaymentDto } from './create-payment.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaymentDto extends CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}
