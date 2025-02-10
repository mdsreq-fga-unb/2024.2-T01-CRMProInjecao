import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { CreateServiceOrderTypeDto } from './dto/create-service-order-type.dto';
import { UpdateServiceOrderTypeDto } from './dto/update-service-order-type.dto';
import {
  ServiceOrder,
  ServiceOrderType,
} from './entities/service-order.entity';
import { ProductsService } from '../products/products.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { ClientService } from '../client/client.service';
import { Budget } from './entities/budget.entity';

interface CreateFromBudgetDto {
  budgetId: string;
  typeId: string;
  description: string;
  clientCPF: string;
  vehicleLicensePlate: string;
  additionalCost?: number;
  productIds?: string[];
}

@Injectable()
export class ServiceOrderService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
    @InjectRepository(ServiceOrderType)
    private serviceOrderTypeRepository: Repository<ServiceOrderType>,
    private productsService: ProductsService,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async create(createServiceOrderDto: CreateServiceOrderDto) {
    const serviceOrder = this.serviceOrderRepository.create(
      createServiceOrderDto,
    );

    // Buscar e validar o tipo
    const type = await this.serviceOrderTypeRepository.findOneBy({
      id: createServiceOrderDto.typeId,
    });
    if (!type) {
      throw new NotFoundException(
        `ServiceOrderType with ID ${createServiceOrderDto.typeId} not found`,
      );
    }
    serviceOrder.type = type;

    // Buscar e validar o cliente pelo CPF
    const client = await this.clientService.findOneByCPF(
      createServiceOrderDto.clientCPF,
    );
    serviceOrder.client = client;

    // Buscar e validar o veículo pela placa
    const vehicle = await this.vehicleService.findOne(
      createServiceOrderDto.vehicleLicensePlate,
    );
    serviceOrder.vehicle = vehicle;

    // Buscar e validar os produtos se fornecidos
    if (createServiceOrderDto.productIds?.length) {
      const products = await Promise.all(
        createServiceOrderDto.productIds.map(async (id) => {
          const product = await this.productsService.findOne(id);
          if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
          }
          return product;
        }),
      );
      serviceOrder.products = products;
    }

    return this.serviceOrderRepository.save(serviceOrder);
  }

  findAll() {
    return this.serviceOrderRepository.find({
      relations: ['type', 'client', 'vehicle', 'products'],
    });
  }

  async findOne(id: string) {
    const serviceOrder = await this.serviceOrderRepository.findOne({
      where: { id },
      relations: ['type', 'client', 'vehicle', 'products'],
    });

    if (!serviceOrder) {
      throw new NotFoundException(`ServiceOrder with ID ${id} not found`);
    }

    return serviceOrder;
  }

  async update(id: string, updateServiceOrderDto: UpdateServiceOrderDto) {
    const serviceOrder = await this.findOne(id);

    if (updateServiceOrderDto.typeId) {
      const type = await this.serviceOrderTypeRepository.findOneBy({
        id: updateServiceOrderDto.typeId,
      });
      if (!type) {
        throw new NotFoundException(
          `ServiceOrderType with ID ${updateServiceOrderDto.typeId} not found`,
        );
      }
      serviceOrder.type = type;
    }

    if (updateServiceOrderDto.clientCPF) {
      const client = await this.clientService.findOneByCPF(
        updateServiceOrderDto.clientCPF,
      );
      serviceOrder.client = client;
    }

    if (updateServiceOrderDto.vehicleLicensePlate) {
      const vehicle = await this.vehicleService.findOne(
        updateServiceOrderDto.vehicleLicensePlate,
      );
      serviceOrder.vehicle = vehicle;
    }

    if (updateServiceOrderDto.productIds) {
      const products = await Promise.all(
        updateServiceOrderDto.productIds.map(async (id) => {
          const product = await this.productsService.findOne(id);
          if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
          }
          return product;
        }),
      );
      serviceOrder.products = products;
    }

    // Atualizar campos simples
    if (updateServiceOrderDto.description) {
      serviceOrder.description = updateServiceOrderDto.description;
    }
    if (updateServiceOrderDto.additionalCost !== undefined) {
      serviceOrder.additionalCost = updateServiceOrderDto.additionalCost;
    }

    return this.serviceOrderRepository.save(serviceOrder);
  }

  async remove(id: string) {
    const serviceOrder = await this.findOne(id);
    return this.serviceOrderRepository.remove(serviceOrder);
  }

  // ServiceOrderType methods
  async createType(createServiceOrderTypeDto: CreateServiceOrderTypeDto) {
    const type = this.serviceOrderTypeRepository.create(
      createServiceOrderTypeDto,
    );
    return this.serviceOrderTypeRepository.save(type);
  }

  findAllTypes() {
    return this.serviceOrderTypeRepository.find();
  }

  async findOneType(id: string) {
    const type = await this.serviceOrderTypeRepository.findOneBy({ id });
    if (!type) {
      throw new NotFoundException(`ServiceOrderType with ID ${id} not found`);
    }
    return type;
  }

  async updateType(
    id: string,
    updateServiceOrderTypeDto: UpdateServiceOrderTypeDto,
  ) {
    const type = await this.findOneType(id);
    Object.assign(type, updateServiceOrderTypeDto);
    return this.serviceOrderTypeRepository.save(type);
  }

  async removeType(id: string) {
    const type = await this.findOneType(id);
    return this.serviceOrderTypeRepository.remove(type);
  }

  async createFromBudget(createFromBudgetDto: CreateFromBudgetDto) {
    const serviceOrder = await this.create({
      typeId: createFromBudgetDto.typeId,
      description: createFromBudgetDto.description,
      clientCPF: createFromBudgetDto.clientCPF,
      vehicleLicensePlate: createFromBudgetDto.vehicleLicensePlate,
      additionalCost: createFromBudgetDto.additionalCost,
      productIds: createFromBudgetDto.productIds,
    });

    // Associar o budget à service order
    const budget = await this.budgetRepository.findOneBy({
      id: createFromBudgetDto.budgetId,
    });
    if (!budget) {
      throw new NotFoundException(
        `Budget with ID ${createFromBudgetDto.budgetId} not found`,
      );
    }

    serviceOrder.budget = budget;
    return this.serviceOrderRepository.save(serviceOrder);
  }
}
