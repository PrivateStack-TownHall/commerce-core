import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransferStatus } from '@prisma/client';

export class CreateTransferDto {
  @ApiProperty({
    example: 'TRF-20260001',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;

  @ApiProperty({
    example: '7c2af64d-4d61-4729-8c55-d2abf4b8d18a',
  })
  @IsUUID()
  fromWarehouseId!: string;

  @ApiProperty({
    example: 'b9655dbd-38ba-4f95-9754-3d44ef7ec56b',
  })
  @IsUUID()
  toWarehouseId!: string;

  @ApiProperty({
    enum: TransferStatus,
    example: TransferStatus.COMPLETED,
  })
  @IsEnum(TransferStatus)
  status!: TransferStatus;

  @ApiPropertyOptional({
    example: 'Transfer to central warehouse.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
