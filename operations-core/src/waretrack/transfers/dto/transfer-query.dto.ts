import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TransferStatus } from '@prisma/client';

import { QueryDto } from '../../../common/dto/query.dto';

export class TransferQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: '7c2af64d-4d61-4729-8c55-d2abf4b8d18a',
  })
  @IsOptional()
  @IsUUID()
  fromWarehouseId?: string;

  @ApiPropertyOptional({
    example: 'b9655dbd-38ba-4f95-9754-3d44ef7ec56b',
  })
  @IsOptional()
  @IsUUID()
  toWarehouseId?: string;

  @ApiPropertyOptional({
    enum: TransferStatus,
  })
  @IsOptional()
  @IsEnum(TransferStatus)
  status?: TransferStatus;
}
