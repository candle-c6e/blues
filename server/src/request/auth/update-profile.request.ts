import { IsOptional, IsString } from "class-validator"

export class UpdateProfileRequest {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  avatar?: string
}
