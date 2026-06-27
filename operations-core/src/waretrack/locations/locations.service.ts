import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { PaginationUtil } from '../../common/utils/pagination.util';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationQueryDto } from './dto/location-query.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectLocation = Prisma.validator<Prisma.LocationSelect>()({
    id: true,
    warehouseId: true,
    code: true,
    name: true,
    capacity: true,
    createdAt: true,
    updatedAt: true,

    warehouse: {
      select: {
        id: true,
        code: true,
        name: true,
      },
    },
  });

  async create(createLocationDto: CreateLocationDto) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: createLocationDto.warehouseId,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found.');
    }

    const existingLocation = await this.prisma.location.findUnique({
      where: {
        code: createLocationDto.code,
      },
    });

    if (existingLocation) {
      throw new ConflictException('Location code already exists.');
    }

    return this.prisma.location.create({
      data: createLocationDto,

      select: this.selectLocation,
    });
  }
  async findAll(query: LocationQueryDto) {
    const where: Prisma.LocationWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          code: {
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
        {
          warehouse: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          warehouse: {
            code: {
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

    const [locations, total] = await this.prisma.$transaction([
      this.prisma.location.findMany({
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
            code: 'asc',
          },
        ],

        select: this.selectLocation,
      }),

      this.prisma.location.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(locations, total, query);
  }
  async findOne(id: string) {
    const location = await this.prisma.location.findUnique({
      where: {
        id,
      },

      select: this.selectLocation,
    });

    if (!location) {
      throw new NotFoundException('Location not found.');
    }

    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    await this.findOne(id);

    if (updateLocationDto.warehouseId) {
      const warehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: updateLocationDto.warehouseId,
        },
      });

      if (!warehouse) {
        throw new NotFoundException('Warehouse not found.');
      }
    }

    if (updateLocationDto.code) {
      const existingLocation = await this.prisma.location.findFirst({
        where: {
          code: updateLocationDto.code,

          NOT: {
            id,
          },
        },
      });

      if (existingLocation) {
        throw new ConflictException('Location code already exists.');
      }
    }

    return this.prisma.location.update({
      where: {
        id,
      },

      data: updateLocationDto,

      select: this.selectLocation,
    });
  }
  async remove(id: string) {
    await this.findOne(id);

    const totalStocks = await this.prisma.stock.count({
      where: {
        locationId: id,
      },
    });

    if (totalStocks > 0) {
      throw new ConflictException(
        'Location cannot be deleted because it is being used by one or more stocks.',
      );
    }

    return this.prisma.location.delete({
      where: {
        id,
      },

      select: this.selectLocation,
    });
  }
}
