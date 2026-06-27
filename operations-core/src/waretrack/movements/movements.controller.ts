import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SwaggerResponse } from '../../common/swagger/swagger-response';

import { MovementsService } from './movements.service';

import { MovementQueryDto } from './dto/movement-query.dto';

@ApiTags('Movements')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get all movements',
    bearer: true,
  })
  findAll(
    @Query()
    query: MovementQueryDto,
  ) {
    return this.movementsService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get movement by id',
    bearer: true,
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.movementsService.findOne(id);
  }
}
