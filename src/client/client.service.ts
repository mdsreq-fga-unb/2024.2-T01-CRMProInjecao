import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SearchClientDto } from './dto/search-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  // Criação de um novo cliente
  async create(createClientDto: CreateClientDto): Promise<{
    message: string;
    data: Client;
  }> {
    const newClient = this.clientRepository.create(createClientDto);
    const savedClient = await this.clientRepository.save(newClient);

    return {
      message: 'Client created successfully',
      data: savedClient,
    };
  }

  // Busca com filtros e paginação
  async findAllWithFilters(
    searchClientDto: SearchClientDto,
  ): Promise<Client[]> {
    const { search, searchVehicle, page = 1, limit = 10 } = searchClientDto;

    const queryBuilder = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.vehicles', 'vehicle');

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('client.name ILIKE :search', { search: `%${search}%` })
            .orWhere('client.email ILIKE :search', { search: `%${search}%` })
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

  // Busca cliente por CPF
  async findOneByCPF(cpf: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { cpf },
      relations: ['vehicles', 'serviceOrders', 'budgets', 'feedbacks'],
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  // Atualização de cliente por CPF
  async update(
    cpf: string,
    updateClientDto: UpdateClientDto,
  ): Promise<{
    message: string;
    data: Client;
  }> {
    const client = await this.clientRepository.findOne({ where: { cpf } });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const updatedClient = this.clientRepository.merge(client, updateClientDto);
    await this.clientRepository.save(updatedClient);

    return {
      message: 'Client updated successfully',
      data: updatedClient,
    };
  }

  // Remoção lógica de cliente por CPF
  async remove(cpf: string): Promise<{ message: string; cpf: string }> {
    const result = await this.clientRepository.softDelete({ cpf });

    if (result.affected === 0) {
      throw new NotFoundException('Client not found');
    }

    return {
      message: 'Client deleted successfully',
      cpf,
    };
  }
}
