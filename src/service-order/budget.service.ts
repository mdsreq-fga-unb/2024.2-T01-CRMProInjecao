import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget, BudgetStatus } from './entities/budget.entity';
import { ClientService } from '../client/client.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { ProductsService } from '../products/products.service';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderType } from './entities/service-order.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
    @InjectRepository(ServiceOrderType)
    private serviceOrderTypeRepository: Repository<ServiceOrderType>,
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private productsService: ProductsService,
    private serviceOrderService: ServiceOrderService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto) {
    const budget = this.budgetRepository.create(createBudgetDto);

    // Buscar e validar o cliente pelo CPF
    const client = await this.clientService.findOneByCPF(
      createBudgetDto.clientCPF,
    );
    budget.client = client;

    // Buscar e validar o veículo pela placa
    const vehicle = await this.vehicleService.findOne(
      createBudgetDto.vehicleLicensePlate,
    );
    budget.vehicle = vehicle;

    return this.budgetRepository.save(budget);
  }

  async findAll() {
    return this.budgetRepository.find({
      relations: [
        'client',
        'vehicle',
        'products',
        'serviceTypes',
        'serviceOrders',
      ],
    });
  }

  async findOne(id: string) {
    const budget = await this.budgetRepository.findOne({
      where: { id },
      relations: [
        'client',
        'vehicle',
        'products',
        'serviceTypes',
        'serviceOrders',
      ],
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.findOne(id);

    if (budget.status === BudgetStatus.CANCELED) {
      throw new BadRequestException('Cannot update a canceled budget');
    }

    if (
      budget.status === BudgetStatus.ACCEPTED &&
      updateBudgetDto.status === BudgetStatus.PENDING
    ) {
      throw new BadRequestException(
        'Cannot change status back to pending after acceptance',
      );
    }

    // Atualizar cliente se fornecido
    if (updateBudgetDto.clientCPF) {
      const client = await this.clientService.findOneByCPF(
        updateBudgetDto.clientCPF,
      );
      budget.client = client;
    }

    // Atualizar veículo se fornecido
    if (updateBudgetDto.vehicleLicensePlate) {
      const vehicle = await this.vehicleService.findOne(
        updateBudgetDto.vehicleLicensePlate,
      );
      budget.vehicle = vehicle;
    }

    // Atualizar produtos se fornecidos
    if (updateBudgetDto.productIds) {
      const products = await Promise.all(
        updateBudgetDto.productIds.map(async (id) => {
          const product = await this.productsService.findOne(id);
          if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
          }
          return product;
        }),
      );
      budget.products = products;
    }

    // Atualizar tipos de serviço se fornecidos
    if (updateBudgetDto.serviceTypeIds) {
      const serviceTypes = await Promise.all(
        updateBudgetDto.serviceTypeIds.map(async (id) => {
          const type = await this.serviceOrderTypeRepository.findOneBy({ id });
          if (!type) {
            throw new NotFoundException(
              `ServiceOrderType with ID ${id} not found`,
            );
          }
          return type;
        }),
      );
      budget.serviceTypes = serviceTypes;
    }

    // Se o status está mudando para ACCEPTED, criar uma ServiceOrder
    if (
      updateBudgetDto.status === BudgetStatus.ACCEPTED &&
      budget.status === BudgetStatus.PENDING
    ) {
      await this.createServiceOrderFromBudget(budget);
    }

    // Atualizar campos simples
    if (updateBudgetDto.name) budget.name = updateBudgetDto.name;
    if (updateBudgetDto.description)
      budget.description = updateBudgetDto.description;
    if (updateBudgetDto.initialCost !== undefined)
      budget.initialCost = updateBudgetDto.initialCost;
    if (updateBudgetDto.additionalCost !== undefined)
      budget.additionalCost = updateBudgetDto.additionalCost;
    if (updateBudgetDto.status) budget.status = updateBudgetDto.status;

    return this.budgetRepository.save(budget);
  }

  async remove(id: string) {
    const budget = await this.findOne(id);
    if (budget.status === BudgetStatus.ACCEPTED) {
      throw new BadRequestException('Cannot delete an accepted budget');
    }
    return this.budgetRepository.softRemove(budget);
  }

  private async createServiceOrderFromBudget(budget: Budget) {
    // Criar ServiceOrder baseada no Budget
    const serviceOrder = await this.serviceOrderService.createFromBudget({
      budgetId: budget.id,
      typeId: budget.serviceTypes[0]?.id, // Primeiro tipo de serviço como principal
      description: `Service Order created from Budget: ${budget.name}\n${budget.description}`,
      clientCPF: budget.client.cpf,
      vehicleLicensePlate: budget.vehicle.licensePlate,
      additionalCost: budget.additionalCost,
      productIds: budget.products.map((product) => product.id),
    });

    return serviceOrder;
  }
}
