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

import { OrdersService } from './orders.service';

import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) { }

  @Post('checkout')
  checkout(
    @Req() req: Request,
  ) {
    return this.ordersService.checkout(
      Number(
        (req as any).user.id,
      ),
    );
  }

  @Get()
  findAll(
    @Req() req: Request,
  ) {
    return this.ordersService.findAll(
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
    return this.ordersService.findOne(
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
    dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(
      id,
      dto,
    );
  }
}