import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductRequest } from 'src/request/product/create-product.request';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import slugify from 'slugify';
import Category from '../categories/entites/categories.entity';
import { ProductImagesService } from '../product-images/product-images.service';
import { UpdateProductRequest } from 'src/request/product/update-product.request';
import { Pagination } from 'src/models/pagination.models';
import { LIMIT } from 'src/constant/index.constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly productImagesService: ProductImagesService,
  ) {}

  async findAll(pagination: Pagination): Promise<Product[]> {
    const skip = (pagination.page - 1) * LIMIT;

    return this.productsRepository.find({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        specialPrice: true,
        createdAt: true,
        updatedAt: true,
        category: {
          id: true,
          name: true,
        },
        productImages: {
          id: true,
          imagePath: true,
        },
      },
      order: { createdAt: 'DESC' },
      relations: { category: true, productImages: true },
      skip,
      take: LIMIT,
    });
  }

  async findOne(slug: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        specialPrice: true,
        createdAt: true,
        updatedAt: true,
        category: {
          id: true,
          name: true,
        },
        productImages: {
          id: true,
          imagePath: true,
        },
      },
      relations: { category: true, productImages: true },
    });

    if (!product) {
      throw new HttpException(
        { data: 'product is not exists' },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  async create(createProductRequest: CreateProductRequest): Promise<Product> {
    const slug = slugify(createProductRequest.name);
    const category = await this.categoriesRepository.findOne({
      where: { id: createProductRequest.categoryId },
    });
    const product = this.productsRepository.create({
      slug,
      ...createProductRequest,
    });

    if (!category) {
      throw new HttpException(
        { data: 'category is not exists' },
        HttpStatus.NOT_FOUND,
      );
    }

    product.category = category;

    await this.productsRepository.save(product);

    await this.productImagesService.create(
      product,
      createProductRequest.imagePaths,
    );

    return product;
  }

  async update(
    productId: string,
    updateProductRequest: UpdateProductRequest,
  ): Promise<Product> {
    let product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const category = await this.categoriesRepository.findOne({
      where: { id: updateProductRequest.categoryId },
    });

    if (!category) {
      throw new HttpException(
        { data: 'category is not exists' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!product) {
      throw new HttpException(
        { data: 'product is not exists' },
        HttpStatus.NOT_FOUND,
      );
    }

    const slug = slugify(updateProductRequest.name || product.name);

    product.category = category;

    if (
      updateProductRequest.imagePaths &&
      updateProductRequest.imagePaths.length
    ) {
      await this.productImagesService.create(
        product,
        updateProductRequest.imagePaths,
      );
    }

    await this.productsRepository.save({
      id: productId,
      slug,
      ...updateProductRequest,
    });

    return product;
  }

  async delete(productId: string): Promise<DeleteResult> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: {
        productImages: true,
      },
    });
    const images = product?.productImages;
    images?.forEach((image) => {
      const filepath = process.cwd() + `/uploads/${image.imagePath}`;
      fs.unlinkSync(filepath);
    });
    return await this.productsRepository.delete({ id: productId });
  }
}
