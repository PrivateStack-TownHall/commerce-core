import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PublicFavoritesService } from './public-favorites.service';

@ApiTags('Public Favorites')
@Controller('public/favorites')
export class PublicFavoritesController {
  constructor(
    private readonly publicFavoritesService: PublicFavoritesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all public favorites',
  })
  findAll() {
    return this.publicFavoritesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get public favorite by id',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.publicFavoritesService.findOne(id);
  }
}
