import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, Role } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { PasswordUtil } from '../common/utils/password.util';
import { PaginationUtil } from '../common/utils/pagination.util';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { QueryDto } from '../common/dto/query.dto';

interface UserQueryDto extends QueryDto {
  role?: Role;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectUser = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    email: true,
    role: true,
    appType: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,

    profile: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    },
  });

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists.');
    }

    const password = await PasswordUtil.hash(createUserDto.password);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password,
      },

      select: this.selectUser,
    });
  }
  async findAll(query: UserQueryDto) {
    const where: Prisma.UserWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          email: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          profile: {
            is: {
              OR: [
                {
                  firstName: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          },
        },
      ];
    }

    if (query.role) {
      where.role = query.role;
    }

    if (query.active !== undefined) {
      where.isActive = query.active === 'true';
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,

        skip: PaginationUtil.skip(query),

        take: PaginationUtil.take(query),

        orderBy: {
          createdAt: 'desc',
        },

        select: this.selectUser,
      }),

      this.prisma.user.count({
        where,
      }),
    ]);

    return PaginationUtil.paginate(users, total, query);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },

      select: this.selectUser,
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: updateUserDto.email,

          NOT: {
            id,
          },
        },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists.');
      }
    }

    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      data.password = await PasswordUtil.hash(updateUserDto.password);
    }

    return this.prisma.user.update({
      where: {
        id,
      },

      data,

      select: this.selectUser,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },

      select: this.selectUser,
    });
  }

  async activate(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: {
        id,
      },

      data: {
        isActive: true,
      },

      select: this.selectUser,
    });
  }

  async deactivate(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },

      select: this.selectUser,
    });
  }
}
