import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { clientCPF, ...vehicleData } = createVehicleDto;

    const client = await this.clientRepository.findOne({
      where: { cpf: clientCPF },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const vehicle = this.vehicleRepository.create({
      ...vehicleData,
      client,
    });

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

  async findAll(clientCPF?: string): Promise<Vehicle[]> {
    const queryBuilder = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.client', 'client');

    if (clientCPF) {
      queryBuilder.where('client.cpf = :clientCPF', { clientCPF });
    }

    return await queryBuilder.getMany();
  }

  async findOne(licensePlate: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { licensePlate },
      relations: ['client'],
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with license plate ${licensePlate} not found`,
      );
    }

    return vehicle;
  }

  async update(
    licensePlate: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<{
    message: string;
    updatedVehicle: Vehicle;
  }> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { licensePlate },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with license plate ${licensePlate} not found`,
      );
    }

    const updatedVehicle = this.vehicleRepository.merge(
      vehicle,
      updateVehicleDto,
    );
    await this.vehicleRepository.save(updatedVehicle);

    return {
      message: 'Vehicle updated successfully',
      updatedVehicle,
    };
  }

  async remove(licensePlate: string): Promise<{
    message: string;
    licensePlate: string;
  }> {
    const deleteResult = await this.vehicleRepository.softDelete({
      licensePlate,
    });

    if (!deleteResult.affected) {
      throw new NotFoundException(
        `Vehicle with license plate ${licensePlate} not found`,
      );
    }

    return {
      message: 'Vehicle removed successfully',
      licensePlate,
    };
  }
}
