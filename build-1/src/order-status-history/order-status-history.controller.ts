import {
   Controller,
   Get,
   Param,
   ParseIntPipe,
   UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { OrderStatusHistoryService } from './order-status-history.service';

@Controller('order-status-history')
@UseGuards(JwtAuthGuard)
export class OrderStatusHistoryController {
   constructor(
      private readonly orderStatusHistoryService: OrderStatusHistoryService,
   ) { }

   @Get()
   findAll() {
      return this.orderStatusHistoryService.findAll();
   }

   @Get('order/:orderId')
   findByOrder(
      @Param(
         'orderId',
         ParseIntPipe,
      )
      orderId: number,
   ) {
      return this.orderStatusHistoryService.findByOrder(
         orderId,
      );
   }

   @Get(':id')
   findOne(
      @Param('id', ParseIntPipe)
      id: number,
   ) {
      return this.orderStatusHistoryService.findOne(
         id,
      );
   }
}