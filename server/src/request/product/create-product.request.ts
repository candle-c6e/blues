import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateProductRequest {
  @IsNotEmpty()
  name!: string

  @IsOptional()
  description?: string

  @IsNotEmpty()
  @IsUUID()
  categoryId!: string

  @IsNotEmpty()
  price!: number

  @IsOptional()
  specialPrice?: number

  @IsArray()
  @ArrayMinSize(1)
  imagePaths!: string[]
}
