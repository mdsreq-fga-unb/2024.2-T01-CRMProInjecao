import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Brackets, Repository } from 'typeorm';
import { SearchClientDto } from './dto/search-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<{
    message: string;
    data: Omit<Client, 'vehicles' | 'deletedAt'>;
  }> {
    const client = this.clientRepository.create(createClientDto);
    await this.clientRepository.save(client);
    return {
      message: 'Client created successfully',
      data: {
        ...client,
      },
    };
  }

  async findAllWithFilters(
    searchClientDto: SearchClientDto,
  ): Promise<Client[]> {
    const { search, searchVehicle, page, limit } = searchClientDto;
    const queryBuilder = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.vehicles', 'vehicle');
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('client.name ILIKE :search', {
            search: `%${search}%`,
          })
            .orWhere('client.email ILIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('client.phoneNumber ILIKE :search', {
              search: `%${search}%`,
            });
        }),
      );
    }

    if (searchVehicle) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('vehicle.licensePlate ILIKE :searchVehicle', {
            searchVehicle: `%${searchVehicle}%`,
          })
            .orWhere('vehicle.model ILIKE :searchVehicle', {
              searchVehicle: `%${searchVehicle}%`,
            })
            .orWhere('vehicle.brand ILIKE :searchVehicle', {
              searchVehicle: `%${searchVehicle}%`,
            });
        }),
      );
    }

    const clients = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return clients;
  }

  async findOneByCPF(cpf: string) {
    return await this.clientRepository.findOne({
      where: { cpf: cpf },
      select: { name: true, email: true, phoneNumber: true, address: true },
    });
  }

  async update(
    cpf: string,
    updateClientDto: UpdateClientDto,
  ): Promise<{ message: string; cpf: string }> {
    const updatedResult = await this.clientRepository.update(
      cpf,
      updateClientDto,
    );
    if (updatedResult.affected === 0) {
      throw new NotFoundException('Client not found');
    }
    return {
      message: 'Client updated successfully',
      cpf: cpf,
    };
  }

  async remove(cpf: string): Promise<{ message: string; cpf: string }> {
    const updateResult = await this.clientRepository.softDelete({ cpf: cpf });
    if (updateResult.affected === 0) {
      throw new NotFoundException('Client not found');
    }
    return {
      message: 'Client deleted successfully',
      cpf: cpf,
    };
  }
}
