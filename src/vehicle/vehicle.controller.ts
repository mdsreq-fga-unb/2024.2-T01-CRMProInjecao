import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async findAll(@Query('clientCPF') clientCPF?: string) {
    return this.vehicleService.findAll(clientCPF);
  }

  @Get(':licensePlate')
  async findOne(@Param('licensePlate') licensePlate: string) {
    return this.vehicleService.findOne(licensePlate);
  }

  @Patch(':licensePlate')
  async update(
    @Param('licensePlate') licensePlate: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(licensePlate, updateVehicleDto);
  }

  @Delete(':licensePlate')
  async remove(@Param('licensePlate') licensePlate: string) {
    return this.vehicleService.remove(licensePlate);
  }
}
