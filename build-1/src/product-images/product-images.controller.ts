import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   ParseIntPipe,
   Patch,
   Post,
   UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProductImagesService } from './product-images.service';

import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Controller('product-images')
export class ProductImagesController {
   constructor(
      private readonly productImagesService: ProductImagesService,
   ) { }

   @Post()
   @UseGuards(JwtAuthGuard)
   create(
      @Body()
      dto: CreateProductImageDto,
   ) {
      return this.productImagesService.create(
         dto,
      );
   }

   @Get()
   findAll() {
      return this.productImagesService.findAll();
   }

   @Get(':id')
   findOne(
      @Param('id', ParseIntPipe)
      id: number,
   ) {
      return this.productImagesService.findOne(
         id,
      );
   }

   @Patch(':id')
   @UseGuards(JwtAuthGuard)
   update(
      @Param('id', ParseIntPipe)
      id: number,

      @Body()
      dto: UpdateProductImageDto,
   ) {
      return this.productImagesService.update(
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
      return this.productImagesService.remove(
         id,
      );
   }
}