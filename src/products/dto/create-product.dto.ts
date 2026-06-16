import {
   IsBoolean,
   IsInt,
   IsNotEmpty,
   IsNumber,
   IsOptional,
   IsString,
   Min,
} from 'class-validator';

export class CreateProductDto {
   @IsInt()
   categoryId!: number;

   @IsNotEmpty()
   @IsString()
   name!: string;

   @IsOptional()
   @IsString()
   description?: string;

   @IsNumber()
   @Min(0)
   price!: number;

   @IsInt()
   @Min(0)
   stock!: number;

   @IsOptional()
   @IsBoolean()
   isActive?: boolean;
}