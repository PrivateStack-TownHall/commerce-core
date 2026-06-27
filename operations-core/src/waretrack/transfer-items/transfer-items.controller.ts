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

import { TransferItemsService } from './transfer-items.service';

import { CreateTransferItemDto } from './dto/create-transfer-item.dto';
import { UpdateTransferItemDto } from './dto/update-transfer-item.dto';
import { TransferItemQueryDto } from './dto/transfer-item-query.dto';

@ApiTags('Transfer Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transfer-items')
export class TransferItemsController {
  constructor(private readonly transferItemsService: TransferItemsService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get all transfer items',
    bearer: true,
  })
  findAll(
    @Query()
    query: TransferItemQueryDto,
  ) {
    return this.transferItemsService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get transfer item by id',
    bearer: true,
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.transferItemsService.findOne(id);
  }

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Create transfer item',
    bearer: true,
  })
  create(
    @Body()
    createTransferItemDto: CreateTransferItemDto,
  ) {
    return this.transferItemsService.create(createTransferItemDto);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Update transfer item',
    bearer: true,
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    updateTransferItemDto: UpdateTransferItemDto,
  ) {
    return this.transferItemsService.update(id, updateTransferItemDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Delete transfer item',
    bearer: true,
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.transferItemsService.remove(id);
  }
}
