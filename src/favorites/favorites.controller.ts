import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   ParseIntPipe,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';

import { type Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { FavoritesService } from './favorites.service';

import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
   constructor(
      private readonly favoritesService: FavoritesService,
   ) { }

   @Post()
   create(
      @Req() req: Request,
      @Body() dto: CreateFavoriteDto,
   ) {
      return this.favoritesService.create(
         Number(req.user!['id']),
         dto.productId,
      );
   }

   @Get()
   findAll(
      @Req() req: Request,
   ) {
      return this.favoritesService.findAll(
         Number(req.user!['id']),
      );
   }

   @Delete(':id')
   remove(
      @Req() req: Request,

      @Param('id', ParseIntPipe)
      id: number,
   ) {
      return this.favoritesService.remove(
         id,
         Number(req.user!['id']),
      );
   }
}