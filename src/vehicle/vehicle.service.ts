import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Client } from '../client/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async create(createVehicleDto: CreateVehicleDto): Promise<{
    message: string;
    data: Pick<Vehicle, 'licensePlate' | 'brand' | 'model' | 'modelYear'> & {
      clientCPF: string;
    };
  }> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    const client = await this.clientRepository.findOne({
      where: { cpf: createVehicleDto.clientCPF },
    });
    if (!client) {
      throw new Error('Client not found');
    }
    vehicle.client = client;
    await this.vehicleRepository.save(vehicle);
    return {
      message: 'Vehicle created successfully',
      data: {
        clientCPF: vehicle.client.cpf,
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        modelYear: vehicle.modelYear,
      },
    };
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
