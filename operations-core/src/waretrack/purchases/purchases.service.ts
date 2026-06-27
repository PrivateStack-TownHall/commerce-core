import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseQueryDto } from './dto/purchase-query.dto';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectPurchase = Prisma.validator<Prisma.PurchaseSelect>()({
    id: true,
    supplierId: true,
    invoice: true,
    purchaseDate: true,
    receivedAt: true,
    status: true,
    total: true,
    notes: true,
    createdAt: true,
    updatedAt: true,

    supplier: {
      select: {
        id: true,
        name: true,
        contactPerson: true,
        phone: true,
        email: true,
      },
    },

    items: {
      select: {
        id: true,
        quantity: true,
        price: true,

        product: {
          select: {
            id: true,
            sku: true,
            name: true,
            unit: true,
          },
        },
      },
    },
  });

  async create(createPurchaseDto: CreatePurchaseDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        id: createPurchaseDto.supplierId,
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found.');
    }

    const existingPurchase = await this.prisma.purchase.findUnique({
      where: {
        invoice: createPurchaseDto.invoice,
      },
    });

    if (existingPurchase) {
      throw new ConflictException('Invoice already exists.');
    }

    return this.prisma.purchase.create({
      data: {
        ...createPurchaseDto,

        purchaseDate: new Date(createPurchaseDto.purchaseDate),

        receivedAt: createPurchaseDto.receivedAt
          ? new Date(createPurchaseDto.receivedAt)
          : null,
      },

      select: this.selectPurchase,
    });
  }

  async findAll(query: PurchaseQueryDto) {
    const where: Prisma.PurchaseWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          invoice: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          supplier: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (query.supplierId) {
      where.supplierId = query.supplierId;
    }

    if (query.status) {
      where.status = query.status;
    }

    const [purchases, total] = await this.prisma.$transaction([
      this.prisma.purchase.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          purchaseDate: 'desc',
        },

        select: this.selectPurchase,
      }),

      this.prisma.purchase.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(purchases, total, query);
  }

  async findOne(id: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: {
        id,
      },

      select: this.selectPurchase,
    });

    if (!purchase) {
      throw new NotFoundException('Purchase not found.');
    }

    return purchase;
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    await this.findOne(id);

    if (updatePurchaseDto.supplierId) {
      const supplier = await this.prisma.supplier.findUnique({
        where: {
          id: updatePurchaseDto.supplierId,
        },
      });

      if (!supplier) {
        throw new NotFoundException('Supplier not found.');
      }
    }

    if (updatePurchaseDto.invoice) {
      const existingPurchase = await this.prisma.purchase.findFirst({
        where: {
          invoice: updatePurchaseDto.invoice,

          NOT: {
            id,
          },
        },
      });

      if (existingPurchase) {
        throw new ConflictException('Invoice already exists.');
      }
    }

    return this.prisma.purchase.update({
      where: {
        id,
      },

      data: {
        ...updatePurchaseDto,

        purchaseDate: updatePurchaseDto.purchaseDate
          ? new Date(updatePurchaseDto.purchaseDate)
          : undefined,

        receivedAt: updatePurchaseDto.receivedAt
          ? new Date(updatePurchaseDto.receivedAt)
          : undefined,
      },

      select: this.selectPurchase,
    });
  }
  async remove(id: string) {
    await this.findOne(id);

    const purchaseItem = await this.prisma.purchaseItem.findFirst({
      where: {
        purchaseId: id,
      },
    });

    if (purchaseItem) {
      throw new ConflictException(
        'Purchase cannot be deleted because it has purchase items.',
      );
    }

    return this.prisma.purchase.delete({
      where: {
        id,
      },

      select: this.selectPurchase,
    });
  }
}
