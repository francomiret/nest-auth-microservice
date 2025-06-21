import { IsNotEmpty, IsDate, IsNumber, IsString, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { Type } from "class-transformer";


enum PaymentMethod {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    BANK_TRANSFER = 'BANK_TRANSFER',
    PAYPAL = 'PAYPAL',
    MERCADOPAGO = 'MERCADOPAGO',
    OTHER = 'OTHER',
}
enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
    REFUNDED = 'REFUNDED',
}


export class CreatePaymentDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsNotEmpty()
    @IsString()
    payerId: string;

    @IsNotEmpty()
    @IsString()
    payeeId: string;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @IsOptional()
    @IsString()
    comments?: string;

    @IsNotEmpty()
    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @IsNotEmpty()
    @IsBoolean()
    available: boolean;
}

