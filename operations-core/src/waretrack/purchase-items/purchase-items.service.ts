import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreatePurchaseItemDto } from './dto/create-purchase-item.dto';
import { UpdatePurchaseItemDto } from './dto/update-purchase-item.dto';
import { PurchaseItemQueryDto } from './dto/purchase-item-query.dto';

@Injectable()
export class PurchaseItemsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectPurchaseItem =
    Prisma.validator<Prisma.PurchaseItemSelect>()({
      id: true,
      purchaseId: true,
      productId: true,
      quantity: true,
      price: true,

      purchase: {
        select: {
          id: true,
          invoice: true,
          status: true,
          purchaseDate: true,
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

  async create(createPurchaseItemDto: CreatePurchaseItemDto) {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        id: createPurchaseItemDto.purchaseId,
      },
    });

    if (!purchase) {
      throw new NotFoundException('Purchase not found.');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: createPurchaseItemDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    const existingItem = await this.prisma.purchaseItem.findFirst({
      where: {
        purchaseId: createPurchaseItemDto.purchaseId,

        productId: createPurchaseItemDto.productId,
      },
    });

    if (existingItem) {
      throw new ConflictException('Product already exists in this purchase.');
    }

    const purchaseItem = await this.prisma.purchaseItem.create({
      data: createPurchaseItemDto,

      select: this.selectPurchaseItem,
    });

    await this.recalculatePurchaseTotal(createPurchaseItemDto.purchaseId);

    return purchaseItem;
  }

  async findAll(query: PurchaseItemQueryDto) {
    const where: Prisma.PurchaseItemWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          purchase: {
            invoice: {
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

    if (query.purchaseId) {
      where.purchaseId = query.purchaseId;
    }

    if (query.productId) {
      where.productId = query.productId;
    }

    const [purchaseItems, total] = await this.prisma.$transaction([
      this.prisma.purchaseItem.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: [
          {
            purchase: {
              purchaseDate: 'desc',
            },
          },
          {
            product: {
              name: 'asc',
            },
          },
        ],

        select: this.selectPurchaseItem,
      }),

      this.prisma.purchaseItem.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(purchaseItems, total, query);
  }

  async findOne(id: string) {
    const purchaseItem = await this.prisma.purchaseItem.findUnique({
      where: {
        id,
      },

      select: this.selectPurchaseItem,
    });

    if (!purchaseItem) {
      throw new NotFoundException('Purchase item not found.');
    }

    return purchaseItem;
  }

  async update(id: string, updatePurchaseItemDto: UpdatePurchaseItemDto) {
    const currentPurchaseItem = await this.findOne(id);

    if (updatePurchaseItemDto.purchaseId) {
      const purchase = await this.prisma.purchase.findUnique({
        where: {
          id: updatePurchaseItemDto.purchaseId,
        },
      });

      if (!purchase) {
        throw new NotFoundException('Purchase not found.');
      }
    }

    if (updatePurchaseItemDto.productId) {
      const product = await this.prisma.product.findUnique({
        where: {
          id: updatePurchaseItemDto.productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found.');
      }
    }

    if (updatePurchaseItemDto.purchaseId || updatePurchaseItemDto.productId) {
      const purchaseId =
        updatePurchaseItemDto.purchaseId ?? currentPurchaseItem.purchaseId;

      const productId =
        updatePurchaseItemDto.productId ?? currentPurchaseItem.productId;

      const existingItem = await this.prisma.purchaseItem.findFirst({
        where: {
          purchaseId,
          productId,

          NOT: {
            id,
          },
        },
      });

      if (existingItem) {
        throw new ConflictException('Product already exists in this purchase.');
      }
    }

    const purchaseItem = await this.prisma.purchaseItem.update({
      where: {
        id,
      },

      data: updatePurchaseItemDto,

      select: this.selectPurchaseItem,
    });

    const purchaseId =
      updatePurchaseItemDto.purchaseId ?? currentPurchaseItem.purchaseId;

    await this.recalculatePurchaseTotal(purchaseId);

    return purchaseItem;
  }

  async remove(id: string) {
    const purchaseItem = await this.findOne(id);

    await this.prisma.purchaseItem.delete({
      where: {
        id,
      },
    });

    await this.recalculatePurchaseTotal(purchaseItem.purchaseId);

    return {
      message: 'Purchase item deleted successfully.',
    };
  }

  private async recalculatePurchaseTotal(purchaseId: string) {
    const items = await this.prisma.purchaseItem.findMany({
      where: {
        purchaseId,
      },

      select: {
        quantity: true,
        price: true,
      },
    });

    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );

    await this.prisma.purchase.update({
      where: {
        id: purchaseId,
      },

      data: {
        total,
      },
    });
  }
}
