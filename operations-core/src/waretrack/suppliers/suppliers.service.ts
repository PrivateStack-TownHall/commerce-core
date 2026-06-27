import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierQueryDto } from './dto/supplier-query.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectSupplier = Prisma.validator<Prisma.SupplierSelect>()({
    id: true,
    name: true,
    contactPerson: true,
    phone: true,
    email: true,
    website: true,
    address: true,
    logo: true,
    notes: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  });

  async create(createSupplierDto: CreateSupplierDto) {
    const existingSupplier = await this.prisma.supplier.findFirst({
      where: {
        name: createSupplierDto.name,
      },
    });

    if (existingSupplier) {
      throw new ConflictException('Supplier already exists.');
    }

    return this.prisma.supplier.create({
      data: createSupplierDto,

      select: this.selectSupplier,
    });
  }

  async findAll(query: SupplierQueryDto) {
    const where: Prisma.SupplierWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          contactPerson: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (query.active !== undefined) {
      where.isActive = query.active === 'true';
    }

    const [suppliers, total] = await this.prisma.$transaction([
      this.prisma.supplier.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectSupplier,
      }),

      this.prisma.supplier.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(suppliers, total, query);
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        id,
      },

      select: this.selectSupplier,
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found.');
    }

    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    await this.findOne(id);

    if (updateSupplierDto.name) {
      const existingSupplier = await this.prisma.supplier.findFirst({
        where: {
          name: updateSupplierDto.name,

          NOT: {
            id,
          },
        },
      });

      if (existingSupplier) {
        throw new ConflictException('Supplier already exists.');
      }
    }

    return this.prisma.supplier.update({
      where: {
        id,
      },

      data: updateSupplierDto,

      select: this.selectSupplier,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.supplier.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },

      select: this.selectSupplier,
    });
  }

  async activate(id: string) {
    await this.findOne(id);

    return this.prisma.supplier.update({
      where: {
        id,
      },

      data: {
        isActive: true,
      },

      select: this.selectSupplier,
    });
  }

  async deactivate(id: string) {
    await this.findOne(id);

    return this.prisma.supplier.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },

      select: this.selectSupplier,
    });
  }
}
