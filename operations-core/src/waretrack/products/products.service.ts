import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectProduct = Prisma.validator<Prisma.ProductSelect>()({
    id: true,
    categoryId: true,
    brandId: true,
    sku: true,
    barcode: true,
    name: true,
    description: true,
    unit: true,
    costPrice: true,
    sellingPrice: true,
    minimumQty: true,
    maximumQty: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,

    category: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },

    brand: {
      select: {
        id: true,
        name: true,
      },
    },
  });

  async create(createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    if (createProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: createProductDto.brandId,
        },
      });

      if (!brand) {
        throw new NotFoundException('Brand not found.');
      }
    }

    const existingProduct = await this.prisma.product.findFirst({
      where: {
        OR: [
          {
            sku: createProductDto.sku,
          },
          ...(createProductDto.barcode
            ? [
                {
                  barcode: createProductDto.barcode,
                },
              ]
            : []),
        ],
      },
    });

    if (existingProduct) {
      if (existingProduct.sku === createProductDto.sku) {
        throw new ConflictException('SKU already exists.');
      }

      if (
        createProductDto.barcode &&
        existingProduct.barcode === createProductDto.barcode
      ) {
        throw new ConflictException('Barcode already exists.');
      }
    }

    return this.prisma.product.create({
      data: createProductDto,

      select: this.selectProduct,
    });
  }

  async findAll(query: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          sku: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          barcode: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.brandId) {
      where.brandId = query.brandId;
    }

    if (query.active !== undefined) {
      where.isActive = query.active === 'true';
    }

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectProduct,
      }),

      this.prisma.product.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(products, total, query);
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },

      select: this.selectProduct,
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: updateProductDto.categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found.');
      }
    }

    if (updateProductDto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: updateProductDto.brandId,
        },
      });

      if (!brand) {
        throw new NotFoundException('Brand not found.');
      }
    }

    if (updateProductDto.sku || updateProductDto.barcode) {
      const existingProduct = await this.prisma.product.findFirst({
        where: {
          NOT: {
            id,
          },

          OR: [
            ...(updateProductDto.sku
              ? [
                  {
                    sku: updateProductDto.sku,
                  },
                ]
              : []),

            ...(updateProductDto.barcode
              ? [
                  {
                    barcode: updateProductDto.barcode,
                  },
                ]
              : []),
          ],
        },
      });

      if (existingProduct) {
        if (
          updateProductDto.sku &&
          existingProduct.sku === updateProductDto.sku
        ) {
          throw new ConflictException('SKU already exists.');
        }

        if (
          updateProductDto.barcode &&
          existingProduct.barcode === updateProductDto.barcode
        ) {
          throw new ConflictException('Barcode already exists.');
        }
      }
    }

    return this.prisma.product.update({
      where: {
        id,
      },

      data: updateProductDto,

      select: this.selectProduct,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },

      select: this.selectProduct,
    });
  }

  async activate(id: string) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: {
        id,
      },

      data: {
        isActive: true,
      },

      select: this.selectProduct,
    });
  }

  async deactivate(id: string) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },

      select: this.selectProduct,
    });
  }
}
