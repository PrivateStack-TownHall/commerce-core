import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { type Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CartService } from './cart.service';

import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) { }

  @Post()
  create(
    @Req() req: Request,
    @Body() dto: CreateCartDto,
  ) {
    return this.cartService.create(
      Number((req as any).user.id),
      dto,
    );
  }

  @Get()
  findAll(
    @Req() req: Request,
  ) {
    return this.cartService.findAll(
      Number((req as any).user.id),
    );
  }

  @Get(':id')
  findOne(
    @Req() req: Request,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cartService.findOne(
      id,
      Number((req as any).user.id),
    );
  }

  @Patch(':id')
  update(
    @Req() req: Request,

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateCartDto,
  ) {
    return this.cartService.update(
      id,
      Number((req as any).user.id),
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req: Request,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cartService.remove(
      id,
      Number((req as any).user.id),
    );
  }
}