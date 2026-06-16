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

import { ReviewsService } from './reviews.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) { }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('product/:productId')
  findByProduct(
    @Param(
      'productId',
      ParseIntPipe,
    )
    productId: number,
  ) {
    return this.reviewsService.findByProduct(
      productId,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: Request,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(
      Number(req.user!['id']),
      dto,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: Request,

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(
      id,
      Number(req.user!['id']),
      dto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Req() req: Request,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.reviewsService.remove(
      id,
      Number(req.user!['id']),
    );
  }
}