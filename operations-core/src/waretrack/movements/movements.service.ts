import { Injectable, NotFoundException } from '@nestjs/common';

import { MovementType, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateMovementDto } from './dto/create-movement.dto';
import { MovementQueryDto } from './dto/movement-query.dto';

@Injectable()
export class MovementsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectMovement = Prisma.validator<Prisma.MovementSelect>()({
    id: true,
    stockId: true,
    type: true,
    quantity: true,
    beforeQty: true,
    afterQty: true,
    reference: true,
    remarks: true,
    createdAt: true,

    stock: {
      select: {
        id: true,
        quantity: true,
        reserved: true,

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
            barcode: true,
            name: true,
            unit: true,
          },
        },
      },
    },
  });

  async create(createMovementDto: CreateMovementDto) {
    const stock = await this.prisma.stock.findUnique({
      where: {
        id: createMovementDto.stockId,
      },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found.');
    }

    const expectedAfterQty =
      createMovementDto.type === MovementType.SALE
        ? createMovementDto.beforeQty - createMovementDto.quantity
        : createMovementDto.beforeQty + createMovementDto.quantity;

    if (expectedAfterQty !== createMovementDto.afterQty) {
      throw new NotFoundException('Invalid movement quantity.');
    }

    return this.prisma.movement.create({
      data: createMovementDto,

      select: this.selectMovement,
    });
  }

  async findAll(query: MovementQueryDto) {
    const where: Prisma.MovementWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          reference: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          remarks: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          stock: {
            product: {
              name: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          stock: {
            product: {
              sku: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          stock: {
            warehouse: {
              name: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
          },
        },
      ];
    }

    if (query.stockId) {
      where.stockId = query.stockId;
    }

    if (query.type) {
      where.type = query.type;
    }

    const [movements, total] = await this.prisma.$transaction([
      this.prisma.movement.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectMovement,
      }),

      this.prisma.movement.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(movements, total, query);
  }
  async findOne(id: string) {
    const movement = await this.prisma.movement.findUnique({
      where: {
        id,
      },

      select: this.selectMovement,
    });

    if (!movement) {
      throw new NotFoundException('Movement not found.');
    }

    return movement;
  }
}
