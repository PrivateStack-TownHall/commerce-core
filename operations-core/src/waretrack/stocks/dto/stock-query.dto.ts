import { IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '../../../common/dto/query.dto';

export class StockQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: '4aef1d2f-6f6d-4a91-9d61-b65db6c1a9e1',
  })
  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @ApiPropertyOptional({
    example: '9c52dd32-7d08-42e2-8b4d-efb15d2d5f3b',
  })
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiPropertyOptional({
    example: '3db6e8d2-9db0-44a4-bf5d-8fdbe5f9d9e4',
  })
  @IsOptional()
  @IsUUID()
  productId?: string;
}
