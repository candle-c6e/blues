import { BaseEntity } from "src/entities/base.entity";
import Category from "../../../modules/categories/entites/categories.entity";
import { ProductImage } from "../../../modules/product-images/entites/product-image.entity";
import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";

@Entity({
  name: 'products'
})
@Index(['slug'], { unique: true })
export class Product extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  name!: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  slug!: string

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price!: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  specialPrice?: number

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category

  @OneToMany(() => ProductImage, productImage => productImage.product)
  productImages!: ProductImage[]
}
