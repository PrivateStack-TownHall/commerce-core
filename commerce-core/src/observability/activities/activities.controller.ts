import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActivitiesService } from './activities.service';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get latest activities',
  })
  getActivities() {
    return this.activitiesService.getActivities();
  }
}
