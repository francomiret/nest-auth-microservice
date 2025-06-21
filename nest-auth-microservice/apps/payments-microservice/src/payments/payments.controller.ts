import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @MessagePattern('payments.create')
  create(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @MessagePattern('payments.findAll')
  findAll() {
    return this.paymentsService.findAll();
  }

  @MessagePattern('payments.findOne')
  findOne(@Payload() id: string) {
    return this.paymentsService.findOne(id);
  }

  @MessagePattern('payments.update')
  update(@Payload() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(updatePaymentDto.id, updatePaymentDto);
  }

  @MessagePattern('payments.remove')
  remove(@Payload() id: string) {
    return this.paymentsService.remove(id);
  }
}
