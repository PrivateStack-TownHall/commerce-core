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

import { TransfersService } from './transfers.service';

import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { TransferQueryDto } from './dto/transfer-query.dto';

@ApiTags('Transfers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get all transfers',
    bearer: true,
  })
  findAll(
    @Query()
    query: TransferQueryDto,
  ) {
    return this.transfersService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get transfer by id',
    bearer: true,
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.transfersService.findOne(id);
  }

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Create transfer',
    bearer: true,
  })
  create(
    @Body()
    createTransferDto: CreateTransferDto,
  ) {
    return this.transfersService.create(createTransferDto);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Update transfer',
    bearer: true,
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    updateTransferDto: UpdateTransferDto,
  ) {
    return this.transfersService.update(id, updateTransferDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Delete transfer',
    bearer: true,
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.transfersService.remove(id);
  }
}
