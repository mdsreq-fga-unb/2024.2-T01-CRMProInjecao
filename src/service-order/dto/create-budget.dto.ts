import { IsString, IsNumber, IsOptional, IsArray, IsUUID, IsEnum } from 'class-validator';
import { BudgetStatus } from '../entities/budget.entity';

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