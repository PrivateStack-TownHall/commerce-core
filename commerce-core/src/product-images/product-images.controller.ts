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

import {
   ApiBearerAuth,
   ApiBody,
   ApiOperation,
   ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProductImagesService } from './product-images.service';

import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

import {
   SwaggerBadRequest,
   SwaggerCreated,
   SwaggerNotFound,
   SwaggerSuccess,
   SwaggerUnauthorized,
} from '../common/swagger/swagger-response';

@ApiTags('Coffee Images')
@Controller('coffee-images')
export class ProductImagesController {
   constructor(
      private readonly productImagesService: ProductImagesService,
   ) { }

   @Post()
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({
      summary: 'Create Coffee Image',
      description:
         'Create a new coffee image',
   })
   @ApiBody({
      type: CreateProductImageDto,
   })
   @SwaggerCreated({
      id: 1,
      productId: 1,
      imageUrl:
         'https://images.unsplash.com/photo-1517705008128-361805f42e86',
      sortOrder: 1,
      createdAt:
         '2026-06-18T00:00:00.000Z',
   })
   @SwaggerBadRequest(
      'Invalid coffee image data',
   )
   @SwaggerUnauthorized()
   create(
      @Body()
      dto: CreateProductImageDto,
   ) {
      return this.productImagesService.create(
         dto,
      );
   }

   @Get()
   @ApiOperation({
      summary: 'Get Coffee Images',
      description:
         'Retrieve all coffee images',
   })
   @SwaggerSuccess({
      data: [
         {
            id: 1,
            productId: 1,
            imageUrl:
               'https://images.unsplash.com/photo-1517705008128-361805f42e86',
            sortOrder: 1,
         },
      ],
   })
   findAll() {
      return this.productImagesService.findAll();
   }

   @Get(':id')
   @ApiOperation({
      summary: 'Get Coffee Image',
      description:
         'Retrieve coffee image detail by id',
   })
   @SwaggerSuccess({
      id: 1,
      productId: 1,
      imageUrl:
         'https://images.unsplash.com/photo-1517705008128-361805f42e86',
      sortOrder: 1,
      createdAt:
         '2026-06-18T00:00:00.000Z',
   })
   @SwaggerNotFound(
      'Coffee image not found',
   )
   findOne(
      @Param(
         'id',
         ParseIntPipe,
      )
      id: number,
   ) {
      return this.productImagesService.findOne(
         id,
      );
   }

   @Patch(':id')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({
      summary: 'Update Coffee Image',
      description:
         'Update coffee image by id',
   })
   @ApiBody({
      type: UpdateProductImageDto,
   })
   @SwaggerSuccess({
      id: 1,
      productId: 1,
      imageUrl:
         'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      sortOrder: 2,
   })
   @SwaggerNotFound(
      'Coffee image not found',
   )
   @SwaggerUnauthorized()
   update(
      @Param(
         'id',
         ParseIntPipe,
      )
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
   @ApiBearerAuth()
   @ApiOperation({
      summary: 'Delete Coffee Image',
      description:
         'Delete coffee image by id',
   })
   @SwaggerSuccess({
      message:
         'Coffee image deleted successfully',
   })
   @SwaggerNotFound(
      'Coffee image not found',
   )
   @SwaggerUnauthorized()
   remove(
      @Param(
         'id',
         ParseIntPipe,
      )
      id: number,
   ) {
      return this.productImagesService.remove(
         id,
      );
   }
}