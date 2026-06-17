import {
   Injectable,
   NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderStatusHistoryService {
   constructor(
      private readonly prisma: PrismaService,
   ) { }

   async findAll() {
      return {
         data:
            await this.prisma.orderStatusHistory.findMany({
               include: {
                  order: true,
               },

               orderBy: {
                  id: 'desc',
               },
            }),
      };
   }

   async findByOrder(
      orderId: number,
   ) {
      const order =
         await this.prisma.order.findUnique({
            where: {
               id: orderId,
            },
         });

      if (!order) {
         throw new NotFoundException(
            'Order not found',
         );
      }

      return {
         data:
            await this.prisma.orderStatusHistory.findMany({
               where: {
                  orderId,
               },

               orderBy: {
                  id: 'asc',
               },
            }),
      };
   }

   async findOne(id: number) {
      const history =
         await this.prisma.orderStatusHistory.findUnique({
            where: {
               id,
            },

            include: {
               order: true,
            },
         });

      if (!history) {
         throw new NotFoundException(
            'History not found',
         );
      }

      return {
         data: history,
      };
   }
}