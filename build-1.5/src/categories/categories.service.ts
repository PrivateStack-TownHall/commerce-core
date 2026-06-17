import {
   Injectable,
   NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AppType } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
   constructor(
      private readonly prisma: PrismaService,
   ) { }

   async create(
      dto: CreateCategoryDto,
   ) {
      return this.prisma.category.create({
         data: {
            appType: AppType.COFFEE,
            name: dto.name,
            description: dto.description,
         },
      });
   }

   async findAll() {
      return this.prisma.category.findMany({
         orderBy: {
            id: 'desc',
         },
      });
   }

   async findOne(id: number) {
      const category =
         await this.prisma.category.findUnique({
            where: {
               id,
            },
         });

      if (!category) {
         throw new NotFoundException(
            'Category not found',
         );
      }

      return category;
   }

   async update(
      id: number,
      dto: UpdateCategoryDto,
   ) {
      await this.findOne(id);

      return this.prisma.category.update({
         where: {
            id,
         },
         data: dto,
      });
   }

   async remove(id: number) {
      await this.findOne(id);

      return this.prisma.category.delete({
         where: {
            id,
         },
      });
   }
}