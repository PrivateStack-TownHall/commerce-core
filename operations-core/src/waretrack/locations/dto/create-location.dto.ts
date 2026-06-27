import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateLocationDto {
  @ApiProperty({
    example: '2bbf46c6-6593-4c13-ae6f-5b86b8a0f8cf',
  })
  @IsUUID()
  warehouseId!: string;

  @ApiProperty({
    example: 'A-01',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code!: string;

  @ApiProperty({
    example: 'Rack A - Shelf 01',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  capacity!: number;
}
