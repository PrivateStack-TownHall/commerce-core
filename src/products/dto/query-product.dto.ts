import { Type } from 'class-transformer';

import {
   IsIn,
   IsInt,
   IsOptional,
   IsString,
} from 'class-validator';

export class QueryProductDto {
   @IsOptional()
   @IsString()
   search?: string;

   @IsOptional()
   @Type(() => Number)
   @IsInt()
   page?: number;

   @IsOptional()
   @Type(() => Number)
   @IsInt()
   limit?: number;

   @IsOptional()
   @Type(() => Number)
   @IsInt()
   categoryId?: number;

   @IsOptional()
   @IsString()
   sort?: string;

   @IsOptional()
   @IsIn(['asc', 'desc'])
   order?: 'asc' | 'desc';
}