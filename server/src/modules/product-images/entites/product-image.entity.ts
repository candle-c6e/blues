import { BaseEntity } from "src/entities/base.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ProductImage extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255
  })
  imagePath!: string

  @ManyToOne(() => Product, product => product.productImages, { onDelete: 'CASCADE' })
  product!: Product
}
