import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from './entites/product-image.entity';

export interface CreateProductImage {
  imagePath: string
}

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>
  ) { }


  async create(product: Product, imagePath: string[]) {
    const productImages = await this.productImagesRepository.createQueryBuilder().insert().values(
      imagePath.map(item => {
        return {
          product,
          imagePath: item
        }
      })
    ).execute()

    return productImages
  }
}
