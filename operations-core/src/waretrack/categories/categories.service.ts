import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectCategory = Prisma.validator<Prisma.CategorySelect>()({
    id: true,
    code: true,
    name: true,
    description: true,
    icon: true,
    createdAt: true,
    updatedAt: true,
  });

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        OR: [
          {
            code: createCategoryDto.code,
          },
          {
            name: createCategoryDto.name,
          },
        ],
      },
    });

    if (existingCategory) {
      throw new ConflictException('Category already exists.');
    }

    return this.prisma.category.create({
      data: createCategoryDto,

      select: this.selectCategory,
    });
  }

  async findAll(query: CategoryQueryDto) {
    const where: Prisma.CategoryWhereInput = {};

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

    const [categories, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectCategory,
      }),

      this.prisma.category.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(categories, total, query);
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },

      select: this.selectCategory,
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    if (updateCategoryDto.name) {
      const existingCategory = await this.prisma.category.findFirst({
        where: {
          OR: [
            {
              code: updateCategoryDto.code,
            },
            {
              name: updateCategoryDto.name,
            },
          ],

          NOT: {
            id,
          },
        },
      });

      if (existingCategory) {
        throw new ConflictException('Category already exists.');
      }
    }

    return this.prisma.category.update({
      where: {
        id,
      },

      data: updateCategoryDto,

      select: this.selectCategory,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.category.delete({
      where: {
        id,
      },

      select: this.selectCategory,
    });
  }
}
