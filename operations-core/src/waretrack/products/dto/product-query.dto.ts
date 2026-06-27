import { IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '../../../common/dto/query.dto';

export class ProductQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: 'c5ef1f0b-07f2-4b2f-a2de-63d91bb1b70e',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    example: '89df11f2-6ec7-4e73-b6fb-f4c1b1cb73e2',
  })
  @IsOptional()
  @IsUUID()
  brandId?: string;
}
