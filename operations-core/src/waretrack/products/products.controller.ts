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

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get all products',
    bearer: true,
  })
  findAll(
    @Query()
    query: ProductQueryDto,
  ) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.STAFF)
  @SwaggerResponse({
    summary: 'Get product by id',
    bearer: true,
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Create product',
    bearer: true,
  })
  create(
    @Body()
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Update product',
    bearer: true,
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Deactivate product',
    bearer: true,
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.productsService.remove(id);
  }

  @Patch(':id/activate')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Activate product',
    bearer: true,
  })
  activate(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.productsService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Deactivate product',
    bearer: true,
  })
  deactivate(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.productsService.deactivate(id);
  }
}
