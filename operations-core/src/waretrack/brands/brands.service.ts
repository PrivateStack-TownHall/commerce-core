import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandQueryDto } from './dto/brand-query.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectBrand = Prisma.validator<Prisma.BrandSelect>()({
    id: true,
    name: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  });

  async create(createBrandDto: CreateBrandDto) {
    const existingBrand = await this.prisma.brand.findFirst({
      where: {
        name: createBrandDto.name,
      },
    });

    if (existingBrand) {
      throw new ConflictException('Brand already exists.');
    }

    return this.prisma.brand.create({
      data: createBrandDto,

      select: this.selectBrand,
    });
  }
  async findAll(query: BrandQueryDto) {
    const where: Prisma.BrandWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [brands, total] = await this.prisma.$transaction([
      this.prisma.brand.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectBrand,
      }),

      this.prisma.brand.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(brands, total, query);
  }
  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id,
      },

      select: this.selectBrand,
    });

    if (!brand) {
      throw new NotFoundException('Brand not found.');
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id);

    if (updateBrandDto.name) {
      const existingBrand = await this.prisma.brand.findFirst({
        where: {
          name: updateBrandDto.name,

          NOT: {
            id,
          },
        },
      });

      if (existingBrand) {
        throw new ConflictException('Brand already exists.');
      }
    }

    return this.prisma.brand.update({
      where: {
        id,
      },

      data: updateBrandDto,

      select: this.selectBrand,
    });
  }
  async remove(id: string) {
    await this.findOne(id);

    const product = await this.prisma.product.findFirst({
      where: {
        brandId: id,
      },
    });

    if (product) {
      throw new ConflictException(
        'Brand cannot be deleted because it is being used by one or more products.',
      );
    }

    return this.prisma.brand.delete({
      where: {
        id,
      },

      select: this.selectBrand,
    });
  }
}
