import {
  IsString,
  IsDate,
  IsInt,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { VehicleStatus } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  @IsString()
  licensePlate: string;

  @IsString()
  model: string;

  @IsString()
  brand: string;

  @IsOptional()
  @IsDate()
  fabricationDate: Date;

  @IsInt()
  modelYear: number;

  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  renavam: string;

  @IsOptional()
  @IsString()
  fuelType: string;

  @IsOptional()
  @IsString()
  chassiNumber: string;

  @IsInt()
  currentMileage: number;

  @IsOptional()
  @IsString()
  descritpion: string;

  @IsEnum(VehicleStatus)
  status: VehicleStatus;

  @IsString()
  @Matches(/^[0-9]{11}$/)
  clientCPF: string;
}
