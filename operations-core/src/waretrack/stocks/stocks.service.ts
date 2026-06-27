import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockQueryDto } from './dto/stock-query.dto';

@Injectable()
export class StocksService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectStock = Prisma.validator<Prisma.StockSelect>()({
    id: true,
    warehouseId: true,
    locationId: true,
    productId: true,
    quantity: true,
    reserved: true,
    createdAt: true,
    updatedAt: true,

    warehouse: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },

    location: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },

    product: {
      select: {
        id: true,
        sku: true,
        name: true,
        unit: true,
      },
    },
  });

  async create(createStockDto: CreateStockDto) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: createStockDto.warehouseId,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found.');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: createStockDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (createStockDto.locationId) {
      const location = await this.prisma.location.findUnique({
        where: {
          id: createStockDto.locationId,
        },
      });

      if (!location) {
        throw new NotFoundException('Location not found.');
      }
    }

    const existingStock = await this.prisma.stock.findUnique({
      where: {
        warehouseId_productId: {
          warehouseId: createStockDto.warehouseId,

          productId: createStockDto.productId,
        },
      },
    });

    if (existingStock) {
      throw new ConflictException(
        'Stock already exists for this warehouse and product.',
      );
    }

    return this.prisma.stock.create({
      data: createStockDto,

      select: this.selectStock,
    });
  }

  async findAll(query: StockQueryDto) {
    const where: Prisma.StockWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          product: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          product: {
            sku: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          warehouse: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (query.warehouseId) {
      where.warehouseId = query.warehouseId;
    }

    if (query.productId) {
      where.productId = query.productId;
    }

    if (query.locationId) {
      where.locationId = query.locationId;
    }

    const [stocks, total] = await this.prisma.$transaction([
      this.prisma.stock.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: [
          {
            warehouse: {
              name: 'asc',
            },
          },
          {
            product: {
              name: 'asc',
            },
          },
        ],

        select: this.selectStock,
      }),

      this.prisma.stock.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(stocks, total, query);
  }
  async findOne(id: string) {
    const stock = await this.prisma.stock.findUnique({
      where: {
        id,
      },

      select: this.selectStock,
    });

    if (!stock) {
      throw new NotFoundException('Stock not found.');
    }

    return stock;
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    await this.findOne(id);

    if (updateStockDto.warehouseId) {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: updateStockDto.warehouseId,
        },
      });

      if (!warehouse) {
        throw new NotFoundException('Warehouse not found.');
      }
    }

    if (updateStockDto.productId) {
      const product = await this.prisma.product.findUnique({
        where: {
          id: updateStockDto.productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found.');
      }
    }

    if (updateStockDto.locationId) {
      const location = await this.prisma.location.findUnique({
        where: {
          id: updateStockDto.locationId,
        },
      });

      if (!location) {
        throw new NotFoundException('Location not found.');
      }
    }

    if (updateStockDto.warehouseId || updateStockDto.productId) {
      const currentStock = await this.prisma.stock.findUnique({
        where: {
          id,
        },
      });

      const warehouseId =
        updateStockDto.warehouseId ?? currentStock!.warehouseId;

      const productId = updateStockDto.productId ?? currentStock!.productId;

      const existingStock = await this.prisma.stock.findFirst({
        where: {
          warehouseId,
          productId,

          NOT: {
            id,
          },
        },
      });

      if (existingStock) {
        throw new ConflictException(
          'Stock already exists for this warehouse and product.',
        );
      }
    }

    return this.prisma.stock.update({
      where: {
        id,
      },

      data: updateStockDto,

      select: this.selectStock,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    const movement = await this.prisma.movement.findFirst({
      where: {
        stockId: id,
      },
    });

    if (movement) {
      throw new ConflictException(
        'Stock cannot be deleted because it has inventory movements.',
      );
    }

    return this.prisma.stock.delete({
      where: {
        id,
      },

      select: this.selectStock,
    });
  }
}
