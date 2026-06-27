import { IsInt, IsNumber, IsUUID, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreatePurchaseItemDto {
  @ApiProperty({
    example: 'b9a4d22b-fdcb-4d7c-b55d-497ec5d17a41',
  })
  @IsUUID()
  purchaseId!: string;

  @ApiProperty({
    example: '3d2c9348-ef38-4525-8aaf-0c5a90ab4f58',
  })
  @IsUUID()
  productId!: string;

  @ApiProperty({
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty({
    example: 125000,
  })
  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  price!: number;
}
