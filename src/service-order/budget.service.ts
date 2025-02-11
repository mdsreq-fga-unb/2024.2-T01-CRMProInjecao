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
import { Product } from '../products/entities/product.entity';
import { ServiceHistoryService } from './service-history.service';
import { ServiceHistoryType } from './entities/service-history.entity';
import { EmailService } from '../email/email.service';

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
    private serviceHistoryService: ServiceHistoryService,
    private emailService: EmailService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto) {
    const budget = this.budgetRepository.create({
      ...createBudgetDto,
      status: BudgetStatus.PENDING,
      initialCost: createBudgetDto.initialCost
        ? parseFloat(createBudgetDto.initialCost.toString())
        : 0,
      additionalCost: createBudgetDto.additionalCost
        ? parseFloat(createBudgetDto.additionalCost.toString())
        : 0,
    });

    // Buscar e validar o cliente pelo CPF
    const client = await this.clientService.findOneByCPF(
      createBudgetDto.clientCPF,
    );
    if (!client) {
      throw new NotFoundException(
        `Cliente com CPF ${createBudgetDto.clientCPF} não encontrado`,
      );
    }
    budget.client = client;

    // Buscar e validar o veículo pela placa
    const vehicle = await this.vehicleService.findOne(
      createBudgetDto.vehicleLicensePlate,
    );
    if (!vehicle) {
      throw new NotFoundException(
        `Veículo com placa ${createBudgetDto.vehicleLicensePlate} não encontrado`,
      );
    }
    budget.vehicle = vehicle;

    // Validar e buscar produtos
    let products: Product[] = [];
    if (createBudgetDto.productIds?.length) {
      products = await this.productsService.findByIds(
        createBudgetDto.productIds,
      );
      if (products.length !== createBudgetDto.productIds.length) {
        throw new BadRequestException(
          'Um ou mais produtos não foram encontrados',
        );
      }
      budget.products = products;
    }

    // Validar e buscar tipos de serviço
    let serviceTypes: ServiceOrderType[] = [];
    if (createBudgetDto.serviceTypeIds?.length) {
      serviceTypes = await this.serviceOrderTypeRepository.findByIds(
        createBudgetDto.serviceTypeIds,
      );
      if (serviceTypes.length !== createBudgetDto.serviceTypeIds.length) {
        throw new BadRequestException(
          'Um ou mais tipos de serviço não foram encontrados',
        );
      }
      budget.serviceTypes = serviceTypes;
    }

    // Calcular totalCost
    let totalCost = parseFloat(budget.initialCost?.toString() || '0');
    totalCost += parseFloat(budget.additionalCost?.toString() || '0');

    // Soma preços dos tipos de serviço
    totalCost += serviceTypes.reduce((sum, type) => {
      return sum + parseFloat(type.price?.toString() || '0');
    }, 0);

    // Soma preços dos produtos
    totalCost += products.reduce((sum, product) => {
      return sum + parseFloat(product.sellPrice?.toString() || '0');
    }, 0);

    budget.totalCost = Number(totalCost.toFixed(2));

    const savedBudget = await this.budgetRepository.save(budget);

    // Registrar histórico
    await this.serviceHistoryService.createHistoryEntry({
      type: ServiceHistoryType.BUDGET_CREATED,
      description: `Orçamento "${savedBudget.name}" criado`,
      budget: savedBudget,
      changes: createBudgetDto,
    });

    // Enviar email para o cliente
    try {
      await this.emailService.sendEmail({
        context: {
          title: 'Novo Orçamento Criado',
          message: `Olá ${savedBudget.client.name},\n\n` +
            `Um novo orçamento foi criado para seu veículo ${savedBudget.vehicle.model} ` +
            `(${savedBudget.vehicle.licensePlate}).\n\n` +
            `Nome: ${savedBudget.name}\n` +
            `Descrição: ${savedBudget.description}\n` +
            `Valor Total: R$ ${savedBudget.totalCost.toFixed(2)}`,
        },
        sendTo: savedBudget.client.email,
        subject: 'Novo Orçamento - PRO INJEÇÃO',
        template: 'simpleEmail',
      });
    } catch (error) {
      console.error('Erro ao enviar email de novo orçamento:', error);
    }

    return savedBudget;
  }

  async findAll() {
    return this.budgetRepository.find({
      relations: [
        'client',
        'vehicle',
        'products',
        'serviceTypes',
        'serviceOrders',
        'serviceOrders.type',
        'serviceOrders.products',
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
        'serviceOrders.type',
        'serviceOrders.products',
      ],
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto) {
    const oldBudget = await this.findOne(id);
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

    // Atualizar relações se fornecidas
    let products = budget.products;
    if (updateBudgetDto.productIds) {
      products = await this.productsService.findByIds(
        updateBudgetDto.productIds,
      );
      if (products.length !== updateBudgetDto.productIds.length) {
        throw new BadRequestException(
          'Um ou mais produtos não foram encontrados',
        );
      }
      budget.products = products;
    }

    let serviceTypes = budget.serviceTypes;
    if (updateBudgetDto.serviceTypeIds) {
      serviceTypes = await this.serviceOrderTypeRepository.findByIds(
        updateBudgetDto.serviceTypeIds,
      );
      if (serviceTypes.length !== updateBudgetDto.serviceTypeIds.length) {
        throw new BadRequestException(
          'Um ou mais tipos de serviço não foram encontrados',
        );
      }
      budget.serviceTypes = serviceTypes;
    }

    // Atualizar campos simples
    if (updateBudgetDto.name) budget.name = updateBudgetDto.name;
    if (updateBudgetDto.description)
      budget.description = updateBudgetDto.description;
    if (updateBudgetDto.initialCost !== undefined) {
      budget.initialCost = parseFloat(updateBudgetDto.initialCost.toString());
    }
    if (updateBudgetDto.additionalCost !== undefined) {
      budget.additionalCost = parseFloat(
        updateBudgetDto.additionalCost.toString(),
      );
    }

    // Recalcular totalCost
    let totalCost = parseFloat(budget.initialCost?.toString() || '0');
    totalCost += parseFloat(budget.additionalCost?.toString() || '0');

    // Soma preços dos tipos de serviço
    totalCost += serviceTypes.reduce((sum, type) => {
      return sum + parseFloat(type.price?.toString() || '0');
    }, 0);

    // Soma preços dos produtos
    totalCost += products.reduce((sum, product) => {
      return sum + parseFloat(product.sellPrice?.toString() || '0');
    }, 0);

    budget.totalCost = Number(totalCost.toFixed(2));

    // Se mudando para ACCEPTED, criar service orders
    if (
      updateBudgetDto.status === BudgetStatus.ACCEPTED &&
      budget.status === BudgetStatus.PENDING
    ) {
      try {
        // Criar uma ordem de serviço para cada tipo de serviço
        const completeServiceOrders = [];
        for (const [index, serviceType] of budget.serviceTypes.entries()) {
          const isFirstOrder = index === 0;

          const serviceOrder = await this.serviceOrderService.createFromBudget({
            budgetId: id,
            typeId: serviceType.id,
            description: `Ordem de Serviço ${index + 1} criada a partir do Orçamento: ${budget.name}\n${budget.description}`,
            clientCPF: budget.client.cpf,
            vehicleLicensePlate: budget.vehicle.licensePlate,
            // Apenas a primeira ordem recebe produtos e custo adicional
            productIds: isFirstOrder ? budget.products.map((p) => p.id) : [],
            additionalCost: isFirstOrder
              ? parseFloat(budget.additionalCost?.toString() || '0')
              : 0,
          });
          completeServiceOrders.push(serviceOrder);
        }
        budget.serviceOrders = completeServiceOrders;
      } catch (error) {
        throw new BadRequestException(
          'Erro ao criar ordens de serviço: ' + error.message,
        );
      }
    }

    budget.status = updateBudgetDto.status || budget.status;
    const savedBudget = await this.budgetRepository.save(budget);

    // Registrar histórico baseado nas mudanças
    if (updateBudgetDto.status === BudgetStatus.ACCEPTED) {
      await this.serviceHistoryService.createHistoryEntry({
        type: ServiceHistoryType.BUDGET_ACCEPTED,
        description: `Orçamento "${savedBudget.name}" aceito`,
        budget: savedBudget,
        changes: updateBudgetDto,
      });
    } else if (updateBudgetDto.status === BudgetStatus.CANCELED) {
      await this.serviceHistoryService.createHistoryEntry({
        type: ServiceHistoryType.BUDGET_CANCELED,
        description: `Orçamento "${savedBudget.name}" cancelado`,
        budget: savedBudget,
        changes: updateBudgetDto,
      });
    } else {
      await this.serviceHistoryService.createHistoryEntry({
        type: ServiceHistoryType.BUDGET_UPDATED,
        description: `Orçamento "${savedBudget.name}" atualizado`,
        budget: savedBudget,
        changes: {
          before: oldBudget,
          after: updateBudgetDto,
        },
      });
    }

    // Enviar email apenas se houver mudança de status
    if (updateBudgetDto.status) {
      const statusMessages = {
        [BudgetStatus.ACCEPTED]: 'foi aceito',
        [BudgetStatus.CANCELED]: 'foi cancelado',
        [BudgetStatus.PENDING]: 'está pendente',
      };

      try {
        await this.emailService.sendEmail({
          context: {
            title: 'Atualização do Orçamento',
            message: `Olá ${savedBudget.client.name},\n\n` +
              `Seu orçamento ${statusMessages[savedBudget.status]}.\n\n` +
              `Nome: ${savedBudget.name}\n` +
              `Veículo: ${savedBudget.vehicle.model} (${savedBudget.vehicle.licensePlate})\n` +
              `Status: ${savedBudget.status}\n` +
              `Valor Total: R$ ${savedBudget.totalCost.toFixed(2)}`,
          },
          sendTo: savedBudget.client.email,
          subject: 'Atualização do Orçamento - PRO INJEÇÃO',
          template: 'simpleEmail',
        });
      } catch (error) {
        console.error('Erro ao enviar email de atualização de orçamento:', error);
      }
    }

    return savedBudget;
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
      additionalCost: parseFloat(budget.additionalCost?.toString() || '0'),
      productIds: budget.products.map((product) => product.id),
    });

    return serviceOrder;
  }
}
