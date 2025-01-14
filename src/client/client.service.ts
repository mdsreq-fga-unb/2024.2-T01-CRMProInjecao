import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll() {
    return await this.clientRepository.find({
      select: { name: true, email: true, phoneNumber: true, address: true },
    });
  }

  async findOneByCPF(cpf: string) {
    return await this.clientRepository.findOne({
      where: { cpf: cpf },
      select: { name: true, email: true, phoneNumber: true, address: true },
    });
  }

  async update(cpf: string, updateClientDto: UpdateClientDto) {
    return await this.clientRepository.update({ cpf: cpf }, updateClientDto);
  }

  async remove(cpf: string) {
    return await this.clientRepository.delete({ cpf: cpf });
  }
}
