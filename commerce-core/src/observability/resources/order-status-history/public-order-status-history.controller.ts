import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicOrderStatusHistoryService } from './public-order-status-history.service';

@ApiTags('Public Order Status History')
@Controller('public/order-status-history')
export class PublicOrderStatusHistoryController {
  constructor(
    private readonly publicOrderStatusHistoryService: PublicOrderStatusHistoryService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all public order status histories',
  })
  findAll() {
    return this.publicOrderStatusHistoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get public order status history by id',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.publicOrderStatusHistoryService.findOne(id);
  }
}
