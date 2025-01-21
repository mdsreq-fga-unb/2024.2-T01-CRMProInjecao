import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Client])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
