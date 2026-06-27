import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { MovementType } from '@prisma/client';

import { QueryDto } from '../../../common/dto/query.dto';

export class MovementQueryDto extends QueryDto {
  @ApiPropertyOptional({
    example: 'bc4abed0-8587-4c70-a89f-77420b92af2d',
  })
  @IsOptional()
  @IsUUID()
  stockId?: string;

  @ApiPropertyOptional({
    enum: MovementType,
  })
  @IsOptional()
  @IsEnum(MovementType)
  type?: MovementType;
}
