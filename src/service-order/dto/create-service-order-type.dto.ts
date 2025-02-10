import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateServiceOrderTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
