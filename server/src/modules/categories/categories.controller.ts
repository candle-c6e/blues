import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Logger } from 'winston';
import { FormCategoryRequest } from '../../request/categories/form-category.request';
import { Role } from '../users/entities/users.entity';
import { CategoriesService } from './categories.service';
import Category from './entites/categories.entity';

@Controller({
  path: '/v1/categories',
})
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async create(
    @Body() formCategoryRequest: FormCategoryRequest,
  ): Promise<Category> {
    return await this.categoriesService.create(formCategoryRequest);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() formCategoryRequest: FormCategoryRequest,
  ): Promise<Category> {
    return await this.categoriesService.update(id, formCategoryRequest);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async delete(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.delete(id);
  }
}
