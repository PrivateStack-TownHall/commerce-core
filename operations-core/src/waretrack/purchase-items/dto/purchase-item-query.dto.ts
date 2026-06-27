import { IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '../../../common/dto/query.dto';

export class PurchaseItemQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: 'b9a4d22b-fdcb-4d7c-b55d-497ec5d17a41',
  })
  @IsOptional()
  @IsUUID()
  purchaseId?: string;

  @ApiPropertyOptional({
    example: '3d2c9348-ef38-4525-8aaf-0c5a90ab4f58',
  })
  @IsOptional()
  @IsUUID()
  productId?: string;
}
