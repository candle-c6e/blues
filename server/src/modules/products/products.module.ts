import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from '../categories/entites/categories.entity';
import { ProductImagesModule } from '../product-images/product-images.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), ProductImagesModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
