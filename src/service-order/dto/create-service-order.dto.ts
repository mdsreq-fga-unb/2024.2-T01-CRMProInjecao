import { IsString, IsUUID, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateServiceOrderDto {
  @IsUUID()
  typeId: string;

  @IsString()
  description: string;

  @IsString()
  clientCPF: string;

  @IsString()
  vehicleLicensePlate: string;

  @IsNumber()
  @IsOptional()
  additionalCost?: number;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  productIds?: string[];
}
