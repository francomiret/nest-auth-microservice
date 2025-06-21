import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaClient } from '../../generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PaymentsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const newPayment = await this.payment.create({
        data: createPaymentDto,
      });
      return newPayment;
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error creating payment',
        details: error.message,
      });
    }
  }

  async findAll(userId: string) {
    try {
      const payments = await this.payment.findMany({
        where: {
          userId
        },
      });
      return payments;
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error finding payments',
        details: error.message,
      });
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const payment = await this.payment.findUnique({
        where: { id, userId },
      });
      return payment;
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error finding payment',
        details: error.message,
      });
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, userId: string) {
    try {
      const updatedPayment = await this.payment.update({
        where: { id, userId },
        data: updatePaymentDto,
      });
      return updatedPayment;
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error updating payment',
        details: error.message,
      });
    }
  }

  async remove(id: string, userId: string) {
    try {
      const deletedPayment = await this.payment.update({
        where: { id, userId },
        data: {
          available: false,
        },
      });
      return deletedPayment;
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error deleting payment',
        details: error.message,
      });
    }
  }
}
