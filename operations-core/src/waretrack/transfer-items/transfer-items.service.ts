import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateTransferItemDto } from './dto/create-transfer-item.dto';
import { UpdateTransferItemDto } from './dto/update-transfer-item.dto';
import { TransferItemQueryDto } from './dto/transfer-item-query.dto';

@Injectable()
export class TransferItemsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectTransferItem =
    Prisma.validator<Prisma.TransferItemSelect>()({
      id: true,
      transferId: true,
      productId: true,
      quantity: true,

      transfer: {
        select: {
          id: true,
          code: true,
          status: true,
          fromWarehouseId: true,
          toWarehouseId: true,
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
    });

  async create(createTransferItemDto: CreateTransferItemDto) {
    const transfer = await this.prisma.transfer.findUnique({
      where: {
        id: createTransferItemDto.transferId,
      },
    });

    if (!transfer) {
      throw new NotFoundException('Transfer not found.');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: createTransferItemDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    const existingItem = await this.prisma.transferItem.findFirst({
      where: {
        transferId: createTransferItemDto.transferId,

        productId: createTransferItemDto.productId,
      },
    });

    if (existingItem) {
      throw new ConflictException('Product already exists in this transfer.');
    }

    const stock = await this.prisma.stock.findFirst({
      where: {
        warehouseId: transfer.fromWarehouseId,

        productId: createTransferItemDto.productId,
      },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found in source warehouse.');
    }

    const available = stock.quantity - stock.reserved;

    if (createTransferItemDto.quantity > available) {
      throw new ConflictException(
        `Insufficient stock. Available quantity: ${available}.`,
      );
    }

    return this.prisma.transferItem.create({
      data: createTransferItemDto,

      select: this.selectTransferItem,
    });
  }
  async findAll(query: TransferItemQueryDto) {
    const where: Prisma.TransferItemWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          transfer: {
            code: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
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
          product: {
            barcode: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (query.transferId) {
      where.transferId = query.transferId;
    }

    if (query.productId) {
      where.productId = query.productId;
    }

    const [transferItems, total] = await this.prisma.$transaction([
      this.prisma.transferItem.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: [
          {
            transfer: {
              createdAt: 'desc',
            },
          },
          {
            product: {
              name: 'asc',
            },
          },
        ],

        select: this.selectTransferItem,
      }),

      this.prisma.transferItem.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(transferItems, total, query);
  }
  async findOne(id: string) {
    const transferItem = await this.prisma.transferItem.findUnique({
      where: {
        id,
      },

      select: this.selectTransferItem,
    });

    if (!transferItem) {
      throw new NotFoundException('Transfer item not found.');
    }

    return transferItem;
  }

  async update(id: string, updateTransferItemDto: UpdateTransferItemDto) {
    const currentTransferItem = await this.findOne(id);

    const transferId =
      updateTransferItemDto.transferId ?? currentTransferItem.transferId;

    const productId =
      updateTransferItemDto.productId ?? currentTransferItem.productId;

    const transfer = await this.prisma.transfer.findUnique({
      where: {
        id: transferId,
      },
    });

    if (!transfer) {
      throw new NotFoundException('Transfer not found.');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    const existingItem = await this.prisma.transferItem.findFirst({
      where: {
        transferId,
        productId,

        NOT: {
          id,
        },
      },
    });

    if (existingItem) {
      throw new ConflictException('Product already exists in this transfer.');
    }

    const stock = await this.prisma.stock.findFirst({
      where: {
        warehouseId: transfer.fromWarehouseId,

        productId,
      },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found in source warehouse.');
    }

    const available = stock.quantity - stock.reserved;

    const quantity =
      updateTransferItemDto.quantity ?? currentTransferItem.quantity;

    if (quantity > available) {
      throw new ConflictException(
        `Insufficient stock. Available quantity: ${available}.`,
      );
    }

    return this.prisma.transferItem.update({
      where: {
        id,
      },

      data: updateTransferItemDto,

      select: this.selectTransferItem,
    });
  }
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.transferItem.delete({
      where: {
        id,
      },

      select: this.selectTransferItem,
    });
  }
}
