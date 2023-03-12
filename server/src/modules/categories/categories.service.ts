import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormCategoryRequest } from 'src/request/categories/form-category.request';
import { Repository } from 'typeorm';
import Category from './entites/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async create(formCategoryRequest: FormCategoryRequest): Promise<Category> {
    return await this.categoriesRepository.save({
      name: formCategoryRequest.name,
    });
  }

  async update(
    categoryId: string,
    formCategoryRequest: FormCategoryRequest,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new HttpException(
        { data: 'category not exists' },
        HttpStatus.NOT_FOUND,
      );
    }

    category.name = formCategoryRequest.name;

    await this.categoriesRepository.save(category);

    return category;
  }

  async delete(categoryId: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new HttpException(
        { data: 'category not exists' },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.categoriesRepository.delete({ id: categoryId });

    return category;
  }
}
