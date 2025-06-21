import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @User() user: { id: string }) {
    return this.paymentsService.create(createPaymentDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user: { id: string }) {
    return this.paymentsService.findAll(user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: { id: string }) {
    return this.paymentsService.findOne(+id, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto, @User() user: { id: string }) {
    return this.paymentsService.update(+id, updatePaymentDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: { id: string }) {
    return this.paymentsService.remove(+id, user.id);
  }
}
