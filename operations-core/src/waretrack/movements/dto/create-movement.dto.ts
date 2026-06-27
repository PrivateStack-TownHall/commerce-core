import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';

import { MovementType } from '@prisma/client';

export class CreateMovementDto {
  @ApiProperty({
    example: 'bc4abed0-8587-4c70-a89f-77420b92af2d',
  })
  @IsUUID()
  stockId!: string;

  @ApiProperty({
    enum: MovementType,
    example: MovementType.PURCHASE,
  })
  @IsEnum(MovementType)
  type!: MovementType;

  @ApiProperty({
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty({
    example: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  beforeQty!: number;

  @ApiProperty({
    example: 110,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  afterQty!: number;

  @ApiPropertyOptional({
    example: 'PO-20260001',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @ApiPropertyOptional({
    example: 'Initial stock from supplier.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}
