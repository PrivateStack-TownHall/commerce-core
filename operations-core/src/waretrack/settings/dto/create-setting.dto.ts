import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateSettingDto {
  @ApiProperty({
    example: 'Central Warehouse',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  warehouseName!: string;

  @ApiProperty({
    example: 'WH-JKT',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  warehouseCode!: string;

  @ApiProperty({
    example: 'Jl. Sudirman No. 100, Jakarta',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  warehouseAddress!: string;

  @ApiProperty({
    example: 10000,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  warehouseCapacity!: number;

  @ApiProperty({
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean()
  lowStockAlert!: boolean;

  @ApiProperty({
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean()
  dailyReport!: boolean;

  @ApiProperty({
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean()
  transferNotification!: boolean;

  @ApiProperty({
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean()
  autoBackup!: boolean;

  @ApiProperty({
    example: 30,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sessionTimeout!: number;
}
