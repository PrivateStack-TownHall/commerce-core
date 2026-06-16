import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { type Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { PaymentsService } from './payments.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) { }

  @Post()
  create(
    @Req() req: Request,

    @Body()
    dto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(
      Number(
        (req as any).user.id,
      ),
      dto,
    );
  }

  @Get()
  findAll(
    @Req() req: Request,
  ) {
    return this.paymentsService.findAll(
      Number(
        (req as any).user.id,
      ),
    );
  }

  @Get(':id')
  findOne(
    @Req() req: Request,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.paymentsService.findOne(
      id,
      Number(
        (req as any).user.id,
      ),
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdatePaymentStatusDto,
  ) {
    return this.paymentsService.updateStatus(
      id,
      dto,
    );
  }
}