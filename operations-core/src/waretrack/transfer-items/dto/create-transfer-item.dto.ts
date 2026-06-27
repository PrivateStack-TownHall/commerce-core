import { IsInt, IsUUID, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateTransferItemDto {
  @ApiProperty({
    example: '6af5293f-23cb-4a74-a0bb-61d9498c8fd1',
  })
  @IsUUID()
  transferId!: string;

  @ApiProperty({
    example: '7ab1299f-a0d2-49e7-b43e-1d3c5fb7ec9a',
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
}
