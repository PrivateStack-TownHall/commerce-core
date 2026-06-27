import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';

import { PurchaseStatus } from '@prisma/client';

export class CreatePurchaseDto {
  @ApiProperty({
    example: 'c6d5f958-c93e-44d0-bdbd-5fd8f28c93ef',
  })
  @IsUUID()
  supplierId!: string;

  @ApiProperty({
    example: 'INV-20260001',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  invoice!: string;

  @ApiProperty({
    example: '2026-06-28T10:00:00.000Z',
  })
  @IsDateString()
  purchaseDate!: string;

  @ApiPropertyOptional({
    example: '2026-06-28T14:30:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  receivedAt?: string;

  @ApiProperty({
    enum: PurchaseStatus,
    example: PurchaseStatus.COMPLETED,
  })
  @IsEnum(PurchaseStatus)
  status!: PurchaseStatus;

  @ApiProperty({
    example: 250000,
  })
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  total!: number;

  @ApiPropertyOptional({
    example: 'First purchase from supplier.',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
