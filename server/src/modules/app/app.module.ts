import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { dataSourceOptions } from 'src/config/typeorm.config';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';
import * as winston from 'winston';
import { ProductsModule } from '../products/products.module';
import { ProductImagesModule } from '../product-images/product-images.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Blues Server', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CategoriesModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    ProductImagesModule,
    UploadsModule
  ],
})
export class AppModule { }
