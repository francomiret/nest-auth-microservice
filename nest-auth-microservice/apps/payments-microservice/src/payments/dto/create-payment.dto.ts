import { PaymentMethod, PaymentStatus } from "../entities/payment.entity";
import { IsNotEmpty, IsDate, IsNumber, IsString, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

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

    /**
     * ID del usuario/entidad que paga
     */
    @IsNotEmpty()
    @IsString()
    payerId: string;

    /**
     * ID del usuario/entidad que cobra
     */
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

    @IsNotEmpty()
    @IsString()
    userId: string;
}
