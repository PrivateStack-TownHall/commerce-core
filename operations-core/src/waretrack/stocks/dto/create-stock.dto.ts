import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateStockDto {
  @ApiProperty({
    example: '4aef1d2f-6f6d-4a91-9d61-b65db6c1a9e1',
  })
  @IsUUID()
  warehouseId!: string;

  @ApiPropertyOptional({
    example: '9c52dd32-7d08-42e2-8b4d-efb15d2d5f3b',
  })
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiProperty({
    example: '3db6e8d2-9db0-44a4-bf5d-8fdbe5f9d9e4',
  })
  @IsUUID()
  productId!: string;

  @ApiPropertyOptional({
    example: 100,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({
    example: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reserved?: number;
}
