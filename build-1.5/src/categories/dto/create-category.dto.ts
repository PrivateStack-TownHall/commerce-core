import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
   @ApiProperty({
      example: 'Coffee',
   })
   name!: string;

   @ApiProperty({
      example: 'Coffee category',
   })
   description?: string;
}