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

import { LocationsService } from './locations.service';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationQueryDto } from './dto/location-query.dto';

@ApiTags('Locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get all locations',
    bearer: true,
  })
  findAll(
    @Query()
    query: LocationQueryDto,
  ) {
    return this.locationsService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get location by id',
    bearer: true,
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.locationsService.findOne(id);
  }

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Create location',
    bearer: true,
  })
  create(
    @Body()
    createLocationDto: CreateLocationDto,
  ) {
    return this.locationsService.create(createLocationDto);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Update location',
    bearer: true,
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Delete location',
    bearer: true,
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.locationsService.remove(id);
  }
}
