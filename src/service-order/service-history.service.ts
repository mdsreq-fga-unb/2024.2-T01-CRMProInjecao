import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ServiceHistory,
  ServiceHistoryType,
} from './entities/service-history.entity';
import { Budget } from './entities/budget.entity';
import { ServiceOrder } from './entities/service-order.entity';

@Injectable()
export class ServiceHistoryService {
  constructor(
    @InjectRepository(ServiceHistory)
    private serviceHistoryRepository: Repository<ServiceHistory>,
  ) {}

  async createHistoryEntry({
    type,
    description,
    changes,
    budget,
    serviceOrder,
    userId,
  }: {
    type: ServiceHistoryType;
    description: string;
    changes?: Record<string, any>;
    budget?: Budget;
    serviceOrder?: ServiceOrder;
    userId?: string;
  }) {
    const history = this.serviceHistoryRepository.create({
      type,
      description,
      changes,
      budget,
      serviceOrder,
      userId,
    });

    return this.serviceHistoryRepository.save(history);
  }

  async findByBudget(budgetId: string) {
    return this.serviceHistoryRepository.find({
      where: { budget: { id: budgetId } },
      order: { createdAt: 'DESC' },
      relations: ['budget', 'serviceOrder', 'serviceOrder.type'],
    });
  }

  async findByServiceOrder(serviceOrderId: string) {
    // Busca tanto histórico direto da ordem quanto do orçamento relacionado
    const serviceOrder = await this.serviceHistoryRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.budget', 'budget')
      .leftJoinAndSelect('history.serviceOrder', 'serviceOrder')
      .leftJoinAndSelect('serviceOrder.type', 'serviceOrderType')
      .where('history.serviceOrder.id = :serviceOrderId', { serviceOrderId })
      .orWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('budget.id')
          .from('budget', 'budget')
          .leftJoin('budget.serviceOrders', 'so')
          .where('so.id = :serviceOrderId', { serviceOrderId })
          .getQuery();
        return 'history.budget.id IN ' + subQuery;
      })
      .orderBy('history.createdAt', 'DESC')
      .getMany();

    return serviceOrder;
  }
}
