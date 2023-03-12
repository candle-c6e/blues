import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class Pagination {
  @IsNumber()
  @Type(() => Number)
  page = 1
}
