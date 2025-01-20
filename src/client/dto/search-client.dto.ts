import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchClientDto {
  @IsOptional()
  @IsString()
  search?: string; //name, email, phone number

  @IsOptional()
  @IsString()
  searchVehicle?: string; //plate,

  @IsNumber()
  page: number = 1;

  @IsNumber()
  limit: number = 20;
}
