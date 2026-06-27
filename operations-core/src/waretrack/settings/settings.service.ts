import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly selectSetting = Prisma.validator<Prisma.SettingSelect>()({
    id: true,
    warehouseName: true,
    warehouseCode: true,
    warehouseAddress: true,
    warehouseCapacity: true,
    lowStockAlert: true,
    dailyReport: true,
    transferNotification: true,
    autoBackup: true,
    sessionTimeout: true,
    createdAt: true,
    updatedAt: true,
  });

  async create(createSettingDto: CreateSettingDto) {
    const existingSetting = await this.prisma.setting.findFirst();

    if (existingSetting) {
      throw new ConflictException('Application settings already exist.');
    }

    return this.prisma.setting.create({
      data: createSettingDto,

      select: this.selectSetting,
    });
  }
  async get() {
    const setting = await this.prisma.setting.findFirst({
      select: this.selectSetting,
    });

    if (!setting) {
      return null;
    }

    return setting;
  }
  async update(updateSettingDto: UpdateSettingDto) {
    const setting = await this.prisma.setting.findFirst({
      select: {
        id: true,
      },
    });

    if (!setting) {
      throw new ConflictException('Application settings not found.');
    }

    return this.prisma.setting.update({
      where: {
        id: setting.id,
      },

      data: updateSettingDto,

      select: this.selectSetting,
    });
  }
  async reset() {
    const setting = await this.prisma.setting.findFirst({
      select: {
        id: true,
      },
    });

    if (!setting) {
      throw new ConflictException('Application settings not found.');
    }

    return this.prisma.setting.update({
      where: {
        id: setting.id,
      },

      data: {
        lowStockAlert: true,
        dailyReport: true,
        transferNotification: true,
        autoBackup: true,
        sessionTimeout: 30,
      },

      select: this.selectSetting,
    });
  }
}
