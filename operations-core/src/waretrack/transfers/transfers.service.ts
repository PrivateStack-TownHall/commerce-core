import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { TransferQueryDto } from './dto/transfer-query.dto';

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectTransfer = Prisma.validator<Prisma.TransferSelect>()({
    id: true,
    code: true,
    fromWarehouseId: true,
    toWarehouseId: true,
    status: true,
    notes: true,
    createdAt: true,
    updatedAt: true,

    fromWarehouse: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },

    toWarehouse: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },

    items: {
      select: {
        id: true,
        quantity: true,

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

  async create(createTransferDto: CreateTransferDto) {
    if (createTransferDto.fromWarehouseId === createTransferDto.toWarehouseId) {
      throw new ConflictException(
        'Source and destination warehouse cannot be the same.',
      );
    }

    const fromWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: createTransferDto.fromWarehouseId,
      },
    });

    if (!fromWarehouse) {
      throw new NotFoundException('Source warehouse not found.');
    }

    const toWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: createTransferDto.toWarehouseId,
      },
    });

    if (!toWarehouse) {
      throw new NotFoundException('Destination warehouse not found.');
    }

    const existingTransfer = await this.prisma.transfer.findUnique({
      where: {
        code: createTransferDto.code,
      },
    });

    if (existingTransfer) {
      throw new ConflictException('Transfer code already exists.');
    }

    return this.prisma.transfer.create({
      data: createTransferDto,

      select: this.selectTransfer,
    });
  }
  async findAll(query: TransferQueryDto) {
    const where: Prisma.TransferWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          code: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          fromWarehouse: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          toWarehouse: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (query.fromWarehouseId) {
      where.fromWarehouseId = query.fromWarehouseId;
    }

    if (query.toWarehouseId) {
      where.toWarehouseId = query.toWarehouseId;
    }

    if (query.status) {
      where.status = query.status;
    }

    const [transfers, total] = await this.prisma.$transaction([
      this.prisma.transfer.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectTransfer,
      }),

      this.prisma.transfer.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(transfers, total, query);
  }
  async findOne(id: string) {
    const transfer = await this.prisma.transfer.findUnique({
      where: {
        id,
      },

      select: this.selectTransfer,
    });

    if (!transfer) {
      throw new NotFoundException('Transfer not found.');
    }

    return transfer;
  }

  async update(id: string, updateTransferDto: UpdateTransferDto) {
    const currentTransfer = await this.findOne(id);

    const fromWarehouseId =
      updateTransferDto.fromWarehouseId ?? currentTransfer.fromWarehouseId;

    const toWarehouseId =
      updateTransferDto.toWarehouseId ?? currentTransfer.toWarehouseId;

    if (fromWarehouseId === toWarehouseId) {
      throw new ConflictException(
        'Source and destination warehouse cannot be the same.',
      );
    }

    if (updateTransferDto.fromWarehouseId) {
      const fromWarehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: updateTransferDto.fromWarehouseId,
        },
      });

      if (!fromWarehouse) {
        throw new NotFoundException('Source warehouse not found.');
      }
    }

    if (updateTransferDto.toWarehouseId) {
      const toWarehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: updateTransferDto.toWarehouseId,
        },
      });

      if (!toWarehouse) {
        throw new NotFoundException('Destination warehouse not found.');
      }
    }

    if (updateTransferDto.code) {
      const existingTransfer = await this.prisma.transfer.findUnique({
        where: {
          code: updateTransferDto.code,
        },
      });

      if (existingTransfer && existingTransfer.id !== id) {
        throw new ConflictException('Transfer code already exists.');
      }
    }

    return this.prisma.transfer.update({
      where: {
        id,
      },

      data: updateTransferDto,

      select: this.selectTransfer,
    });
  }
  async remove(id: string) {
    await this.findOne(id);

    const totalItems = await this.prisma.transferItem.count({
      where: {
        transferId: id,
      },
    });

    if (totalItems > 0) {
      throw new ConflictException(
        'Transfer cannot be deleted because it has transfer items.',
      );
    }

    return this.prisma.transfer.delete({
      where: {
        id,
      },

      select: this.selectTransfer,
    });
  }
}
