import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entites/product-image.entity';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [ProductImagesService]
})
export class ProductImagesModule { }
