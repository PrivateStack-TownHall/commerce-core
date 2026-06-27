import { IsEnum, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { QueryDto } from '../../common/dto/query.dto';

export class UserQueryDto extends QueryDto {
  @ApiPropertyOptional({
    enum: Role,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
