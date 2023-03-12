import { IsString } from 'class-validator';

export class FormCategoryRequest {
  @IsString()
  readonly name!: string;
}
