import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Pagination } from 'src/models/pagination.models';
import { CreateProductRequest } from 'src/request/product/create-product.request';
import { UpdateProductRequest } from 'src/request/product/update-product.request';
import { Role } from '../users/entities/users.entity';
import { ProductsService } from './products.service';

@Controller({
  path: '/v1/products',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async findAll(@Query() pagination: Pagination) {
    return this.productsService.findAll(pagination);
  }

  @Get('/:slug')
  async findOne(@Param('slug') slug: string) {
    console.log(slug);
    return this.productsService.findOne(slug);
  }

  @Post('/')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createProductRequest: CreateProductRequest) {
    return this.productsService.create(createProductRequest);
  }

  @Patch('/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async update(
    @Param('id') productId: string,
    @Body() updateProductRequest: UpdateProductRequest,
  ) {
    return this.productsService.update(productId, updateProductRequest);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async delete(@Param('id') productId: string) {
    return this.productsService.delete(productId);
  }
}
