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

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { PaymentsService } from './payments.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

import { type AuthRequest } from '../common/interfaces/auth-request.interface';

import {
  SwaggerBadRequest,
  SwaggerNotFound,
  SwaggerSuccess,
  SwaggerUnauthorized,
} from '../common/swagger/swagger-response';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create Payment',
    description:
      'Create payment for an existing order',
  })
  @ApiBody({
    type: CreatePaymentDto,
  })
  @SwaggerSuccess({
    message:
      'Payment created successfully',
    data: {
      id: 1,
      orderId: 1,
      amount: 356000,
      method: 'BANK_TRANSFER',
      status: 'PENDING',
    },
  })
  @SwaggerBadRequest(
    'Payment already exists',
  )
  @SwaggerUnauthorized()
  create(
    @Req() req: AuthRequest,

    @Body()
    dto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(
      req.user.id,
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Payments',
    description:
      'Retrieve current user payments',
  })
  @SwaggerSuccess({
    data: [
      {
        id: 1,
        orderId: 1,
        amount: 356000,
        method: 'BANK_TRANSFER',
        status: 'SUCCESS',
      },
    ],
  })
  @SwaggerUnauthorized()
  findAll(
    @Req() req: AuthRequest,
  ) {
    return this.paymentsService.findAll(
      req.user.id,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Payment',
    description:
      'Retrieve payment detail by id',
  })
  @SwaggerSuccess({
    data: {
      id: 1,
      orderId: 1,
      amount: 356000,
      method: 'BANK_TRANSFER',
      status: 'SUCCESS',
    },
  })
  @SwaggerNotFound(
    'Payment not found',
  )
  @SwaggerUnauthorized()
  findOne(
    @Req() req: AuthRequest,

    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.paymentsService.findOne(
      id,
      req.user.id,
    );
  }

  @Patch(':id/status')
  @ApiOperation({
    summary:
      'Update Payment Status',
    description:
      'Update payment status by id',
  })
  @ApiBody({
    type: UpdatePaymentStatusDto,
  })
  @SwaggerSuccess({
    message:
      'Payment status updated successfully',
    data: {
      id: 1,
      status: 'SUCCESS',
      paidAt:
        '2026-06-17T04:00:00.000Z',
    },
  })
  @SwaggerNotFound(
    'Payment not found',
  )
  @SwaggerUnauthorized()
  updateStatus(
    @Param(
      'id',
      ParseIntPipe,
    )
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