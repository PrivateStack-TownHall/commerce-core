import {
   IsInt,
   IsOptional,
   IsString,
} from 'class-validator';

export class CreateProductImageDto {
   @IsInt()
   productId!: number;

   @IsString()
   imageUrl!: string;

   @IsOptional()
   @IsInt()
   sortOrder?: number;
}