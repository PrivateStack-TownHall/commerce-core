import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicCartService } from './public-cart.service';

@ApiTags('Public Cart')
@Controller('public/cart')
export class PublicCartController {
  constructor(private readonly publicCartService: PublicCartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all public cart items',
  })
  findAll() {
    return this.publicCartService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get public cart item by id',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.publicCartService.findOne(id);
  }
}
