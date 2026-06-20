import {
   Controller,
   Get,
   Param,
   ParseIntPipe,
   UseGuards,
} from '@nestjs/common';

import {
   ApiBearerAuth,
   ApiOperation,
   ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { OrderStatusHistoryService } from './order-status-history.service';

import {
   SwaggerNotFound,
   SwaggerSuccess,
   SwaggerUnauthorized,
} from '../common/swagger/swagger-response';

@ApiTags('Order Status History')
@Controller('order-status-history')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderStatusHistoryController {
   constructor(
      private readonly orderStatusHistoryService: OrderStatusHistoryService,
   ) { }

   @Get()
   @ApiOperation({
      summary: 'Get Order Status Histories',
      description:
         'Retrieve all order status history records',
   })
   @SwaggerSuccess({
      data: [
         {
            id: 1,
            orderId: 1,
            status: 'PENDING',
            notes:
               'Order created successfully',
            createdAt:
               '2026-06-20T00:00:00.000Z',
         },
      ],
   })
   @SwaggerUnauthorized()
   findAll() {
      return this.orderStatusHistoryService.findAll();
   }

   @Get('order/:orderId')
   @ApiOperation({
      summary:
         'Get Order History By Order',
      description:
         'Retrieve status history by order id',
   })
   @SwaggerSuccess({
      data: [
         {
            id: 1,
            orderId: 1,
            status: 'PENDING',
            notes:
               'Order created successfully',
            createdAt:
               '2026-06-20T00:00:00.000Z',
         },
         {
            id: 2,
            orderId: 1,
            status: 'PAID',
            notes:
               'Payment received',
            createdAt:
               '2026-06-20T01:00:00.000Z',
         },
      ],
   })
   @SwaggerNotFound(
      'Order history not found',
   )
   @SwaggerUnauthorized()
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
   @ApiOperation({
      summary:
         'Get Order Status History',
      description:
         'Retrieve order status history detail by id',
   })
   @SwaggerSuccess({
      data: {
         id: 1,
         orderId: 1,
         status: 'PENDING',
         notes:
            'Order created successfully',
         createdAt:
            '2026-06-20T00:00:00.000Z',
      },
   })
   @SwaggerNotFound(
      'Order history not found',
   )
   @SwaggerUnauthorized()
   findOne(
      @Param(
         'id',
         ParseIntPipe,
      )
      id: number,
   ) {
      return this.orderStatusHistoryService.findOne(
         id,
      );
   }
}