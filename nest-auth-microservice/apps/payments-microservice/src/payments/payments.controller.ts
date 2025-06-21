import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @MessagePattern('payments.create')
  async create(@Payload() createPaymentDto: CreatePaymentDto) {
    return await this.paymentsService.create(createPaymentDto);
  }

  @MessagePattern('payments.findAll')
  async findAll(@Payload() userId: string) {
    return await this.paymentsService.findAll(userId);
  }

  @MessagePattern('payments.findOne')
  async findOne(@Payload() data: { id: string, userId: string }) {
    return await this.paymentsService.findOne(data.id, data.userId);
  }

  @MessagePattern('payments.update')
  async update(@Payload() data: { id: string, updatePaymentDto: UpdatePaymentDto }) {
    return await this.paymentsService.update(data.id, data.updatePaymentDto);
  }

  @MessagePattern('payments.remove')
  async remove(@Payload() data: { id: string, userId: string }) {
    return await this.paymentsService.remove(data.id, data.userId);
  }
}
