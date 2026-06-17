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

import {
   ApiBearerAuth,
   ApiBody,
   ApiOperation,
   ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

import {
   SwaggerBadRequest,
   SwaggerCreated,
   SwaggerNotFound,
   SwaggerSuccess,
   SwaggerUnauthorized,
} from '../common/swagger/swagger-response';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
   constructor(
      private readonly productsService: ProductsService,
   ) { }

   @Post()
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({
      summary: 'Create Product',
      description:
         'Create a new product',
   })
   @ApiBody({
      type: CreateProductDto,
   })
   @SwaggerCreated({
      id: 1,
      categoryId: 1,
      appType: 'COFFEE',
      name: 'Espresso',
      description:
         'Strong espresso shot',
      price: 25000,
      stock: 100,
      isActive: true,
      createdAt:
         '2026-06-17T00:00:00.000Z',
      updatedAt:
         '2026-06-17T00:00:00.000Z',
   })
   @SwaggerBadRequest(
      'Invalid product data',
   )
   @SwaggerUnauthorized()
   create(
      @Body()
      dto: CreateProductDto,
   ) {
      return this.productsService.create(
         dto,
      );
   }

   @Get()
   @ApiOperation({
      summary: 'Get Products',
      description:
         'Retrieve products with pagination, search and sorting',
   })
   @SwaggerSuccess({
      page: 1,
      limit: 10,
      total: 12,
      data: [
         {
            id: 1,
            categoryId: 1,
            appType: 'COFFEE',
            name: 'Espresso',
            description:
               'Strong espresso shot',
            price: 25000,
            stock: 100,
            isActive: true,
         },
      ],
   })
   findAll(
      @Query()
      query: QueryProductDto,
   ) {
      return this.productsService.findAll(
         query,
      );
   }

   @Get(':id')
   @ApiOperation({
      summary: 'Get Product',
      description:
         'Retrieve product detail by id',
   })
   @SwaggerSuccess({
      id: 1,
      categoryId: 1,
      appType: 'COFFEE',
      name: 'Espresso',
      description:
         'Strong espresso shot',
      price: 25000,
      stock: 100,
      isActive: true,
      category: {
         id: 1,
         name: 'Coffee',
      },
      images: [],
   })
   @SwaggerNotFound(
      'Product not found',
   )
   findOne(
      @Param(
         'id',
         ParseIntPipe,
      )
      id: number,
   ) {
      return this.productsService.findOne(
         id,
      );
   }

   @Patch(':id')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({
      summary: 'Update Product',
      description:
         'Update product by id',
   })
   @ApiBody({
      type: UpdateProductDto,
   })
   @SwaggerSuccess({
      id: 1,
      categoryId: 1,
      appType: 'COFFEE',
      name: 'Updated Espresso',
      description:
         'Updated description',
      price: 30000,
      stock: 90,
      isActive: true,
   })
   @SwaggerNotFound(
      'Product not found',
   )
   @SwaggerUnauthorized()
   update(
      @Param(
         'id',
         ParseIntPipe,
      )
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
   @ApiBearerAuth()
   @ApiOperation({
      summary: 'Delete Product',
      description:
         'Delete product by id',
   })
   @SwaggerSuccess({
      message:
         'Product deleted successfully',
   })
   @SwaggerNotFound(
      'Product not found',
   )
   @SwaggerUnauthorized()
   remove(
      @Param(
         'id',
         ParseIntPipe,
      )
      id: number,
   ) {
      return this.productsService.remove(
         id,
      );
   }
}