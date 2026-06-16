import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   ParseIntPipe,
   Patch,
   Post,
   Query,
   UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Controller('products')
export class ProductsController {
   constructor(
      private readonly productsService: ProductsService,
   ) { }

   @Post()
   @UseGuards(JwtAuthGuard)
   create(
      @Body()
      dto: CreateProductDto,
   ) {
      return this.productsService.create(
         dto,
      );
   }

   @Get()
   findAll(
      @Query()
      query: QueryProductDto,
   ) {
      return this.productsService.findAll(
         query,
      );
   }

   @Get(':id')
   findOne(
      @Param('id', ParseIntPipe)
      id: number,
   ) {
      return this.productsService.findOne(
         id,
      );
   }

   @Patch(':id')
   @UseGuards(JwtAuthGuard)
   update(
      @Param('id', ParseIntPipe)
      id: number,

      @Body()
      dto: UpdateProductDto,
   ) {
      return this.productsService.update(
         id,
         dto,
      );
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard)
   remove(
      @Param('id', ParseIntPipe)
      id: number,
   ) {
      return this.productsService.remove(
         id,
      );
   }
}