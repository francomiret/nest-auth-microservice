export class Payment {
    id: string;
    date: Date;
    amount: number;
    currency: string;
    /**
     * ID del usuario/entidad que paga
     */
    payerId: string;
    /**
     * ID del usuario/entidad que cobra
     */
    payeeId: string;
    method: PaymentMethod;
    comments?: string;
    status: PaymentStatus;
    available: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
export enum PaymentMethod {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    BANK_TRANSFER = 'BANK_TRANSFER',
    PAYPAL = 'PAYPAL',
    MERCADOPAGO = 'MERCADOPAGO',
    OTHER = 'OTHER',
}
export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
    REFUNDED = 'REFUNDED',
}
