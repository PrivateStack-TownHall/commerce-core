import { IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '../../../common/dto/query.dto';

export class TransferItemQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: '6af5293f-23cb-4a74-a0bb-61d9498c8fd1',
  })
  @IsOptional()
  @IsUUID()
  transferId?: string;

  @ApiPropertyOptional({
    example: '7ab1299f-a0d2-49e7-b43e-1d3c5fb7ec9a',
  })
  @IsOptional()
  @IsUUID()
  productId?: string;
}
