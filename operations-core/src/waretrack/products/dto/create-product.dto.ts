import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    example: 'c5ef1f0b-07f2-4b2f-a2de-63d91bb1b70e',
  })
  @IsUUID()
  categoryId!: string;

  @ApiPropertyOptional({
    example: '89df11f2-6ec7-4e73-b6fb-f4c1b1cb73e2',
  })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiProperty({
    example: 'KB-001',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku!: string;

  @ApiPropertyOptional({
    example: '8999990001112',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  barcode?: string;

  @ApiProperty({
    example: 'Espresso Beans',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional({
    example: 'Premium Arabica Coffee Beans',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'kg',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  unit!: string;

  @ApiProperty({
    example: 85000,
  })
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  costPrice!: number;

  @ApiProperty({
    example: 120000,
  })
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  sellingPrice!: number;

  @ApiPropertyOptional({
    example: 10,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minimumQty?: number;

  @ApiPropertyOptional({
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maximumQty?: number;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
