import { BaseEntity } from '../../../entities/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Product } from '../../../modules/products/entities/product.entity';

@Entity({
  name: 'categories',
})
@Index(['name'], { unique: true })
export default class Category extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products!: Product[]
}
