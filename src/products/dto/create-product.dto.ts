import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  costPrice: number;

  @IsNumber()
  sellPrice: number;

  @IsArray()
  @IsString({ each: true })
  categories: string[];
}
