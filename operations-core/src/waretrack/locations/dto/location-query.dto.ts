import { IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '../../../common/dto/query.dto';

export class LocationQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: '2bbf46c6-6593-4c13-ae6f-5b86b8a0f8cf',
  })
  @IsOptional()
  @IsUUID()
  warehouseId?: string;
}
