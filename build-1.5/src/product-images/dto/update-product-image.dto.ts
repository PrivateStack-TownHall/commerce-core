import {
   IsInt,
   IsOptional,
   IsString,
} from 'class-validator';

export class UpdateProductImageDto {
   @IsOptional()
   @IsString()
   imageUrl?: string;

   @IsOptional()
   @IsInt()
   sortOrder?: number;
}