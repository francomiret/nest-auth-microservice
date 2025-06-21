import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) { }

  create(createPaymentDto: CreatePaymentDto, userId: string) {
    return this.natsClient.send('payments.create', { ...createPaymentDto, userId }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  findAll(userId: string) {
    return this.natsClient.send('payments.findAll', userId).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  findOne(id: string, userId: string) {
    return this.natsClient.send('payments.findOne', { id, userId }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto, userId: string) {
    return this.natsClient.send('payments.update', { id, updatePaymentDto: { ...updatePaymentDto, userId } }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  remove(id: string, userId: string) {
    return this.natsClient.send('payments.remove', { id, userId }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }
}
