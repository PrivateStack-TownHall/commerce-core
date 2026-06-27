import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicOrdersService } from './public-orders.service';

@ApiTags('Public Orders')
@Controller('public/orders')
export class PublicOrdersController {
  constructor(private readonly publicOrdersService: PublicOrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all public orders',
  })
  findAll() {
    return this.publicOrdersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get public order by id',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.publicOrdersService.findOne(id);
  }
}
