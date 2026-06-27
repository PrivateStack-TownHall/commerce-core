import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SwaggerResponse } from '../../common/swagger/swagger-response';

import { StocksService } from './stocks.service';

import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockQueryDto } from './dto/stock-query.dto';

@ApiTags('Stocks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get all stocks',
    bearer: true,
  })
  findAll(
    @Query()
    query: StockQueryDto,
  ) {
    return this.stocksService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get stock by id',
    bearer: true,
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.stocksService.findOne(id);
  }

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Create stock',
    bearer: true,
  })
  create(
    @Body()
    createStockDto: CreateStockDto,
  ) {
    return this.stocksService.create(createStockDto);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Update stock',
    bearer: true,
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    updateStockDto: UpdateStockDto,
  ) {
    return this.stocksService.update(id, updateStockDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Delete stock',
    bearer: true,
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.stocksService.remove(id);
  }
}
