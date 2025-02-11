import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  initialCost?: number;

  @IsNumber()
  @IsOptional()
  additionalCost?: number;

  @IsString()
  clientCPF: string;

  @IsString()
  vehicleLicensePlate: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  productIds?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  serviceTypeIds?: string[];
}
