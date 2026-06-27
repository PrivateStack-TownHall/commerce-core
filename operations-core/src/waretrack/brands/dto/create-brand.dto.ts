import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Nestlé',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({
    example: 'Premium coffee brand.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
