import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SwaggerResponse } from '../../common/swagger/swagger-response';

import { SettingsService } from './settings.service';

import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@ApiTags('Settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles(Role.OWNER, Role.ADMIN)
  @SwaggerResponse({
    summary: 'Get application settings',
    bearer: true,
  })
  get() {
    return this.settingsService.get();
  }

  @Post()
  @Roles(Role.OWNER)
  @SwaggerResponse({
    summary: 'Create application settings',
    bearer: true,
  })
  create(
    @Body()
    createSettingDto: CreateSettingDto,
  ) {
    return this.settingsService.create(createSettingDto);
  }

  @Patch()
  @Roles(Role.OWNER)
  @SwaggerResponse({
    summary: 'Update application settings',
    bearer: true,
  })
  update(
    @Body()
    updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.update(updateSettingDto);
  }

  @Patch('reset')
  @Roles(Role.OWNER)
  @SwaggerResponse({
    summary: 'Reset application settings',
    bearer: true,
  })
  reset() {
    return this.settingsService.reset();
  }
}
