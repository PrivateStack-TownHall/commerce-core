import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MonitoringService } from './monitoring.service';

@ApiTags('Monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  @ApiOperation({
    summary: 'Get application monitoring information',
  })
  getMonitoring() {
    return this.monitoringService.getMonitoring();
  }
}
