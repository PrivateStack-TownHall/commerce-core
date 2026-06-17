import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { OrderStatusHistoryModule } from './order-status-history/order-status-history.module'
import { AuditLogsModule } from './audit-logs/audit-logs.module'

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    ProductImagesModule,
    FavoritesModule,
    ReviewsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    OrderStatusHistoryModule,
    AuditLogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
