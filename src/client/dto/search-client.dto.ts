import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchClientDto {
  @IsOptional()
  @IsString({ message: 'Busca deve ser uma string.' })
  search?: string; // Nome, email, telefone

  @IsOptional()
  @IsString({ message: 'Busca por veículo deve ser uma string.' })
  searchVehicle?: string; // Placa, modelo

  @Type(() => Number)
  @IsNumber({}, { message: 'Página deve ser um número válido.' })
  @Min(1, { message: 'Página deve ser no mínimo 1.' })
  page: number = 1;

  @Type(() => Number)
  @IsNumber({}, { message: 'Limite deve ser um número válido.' })
  @Min(1, { message: 'Limite deve ser no mínimo 1.' })
  limit: number = 20;
}
