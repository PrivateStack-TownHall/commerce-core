import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicPaymentsService } from './public-payments.service';

@ApiTags('Public Payments')
@Controller('public/payments')
export class PublicPaymentsController {
  constructor(private readonly publicPaymentsService: PublicPaymentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all public payments',
  })
  findAll() {
    return this.publicPaymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get public payment by id',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.publicPaymentsService.findOne(id);
  }
}
