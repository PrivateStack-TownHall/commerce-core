import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { PurchaseStatus } from '@prisma/client';

import { QueryDto } from '../../../common/dto/query.dto';

export class PurchaseQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: 'c6d5f958-c93e-44d0-bdbd-5fd8f28c93ef',
  })
  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @ApiPropertyOptional({
    enum: PurchaseStatus,
  })
  @IsOptional()
  @IsEnum(PurchaseStatus)
  status?: PurchaseStatus;
}
