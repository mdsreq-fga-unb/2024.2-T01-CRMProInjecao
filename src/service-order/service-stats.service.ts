import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ServiceOrder,
  ServiceOrderStatus,
} from './entities/service-order.entity';
import { Budget, BudgetStatus } from './entities/budget.entity';

interface RecentServiceResponse {
  id: string;
  type: 'budget' | 'service_order';
  title: string;
  status: string;
  clientName: string;
  createdAt: Date;
  totalValue: number;
  budgetId?: string;
  serviceOrderId?: string;
}

@Injectable()
export class ServiceStatsService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async getStats() {
    // Estatísticas de Orçamentos
    const [pendingBudgets, acceptedBudgets, canceledBudgets] =
      await Promise.all([
        this.budgetRepository.count({
          where: { status: BudgetStatus.PENDING },
        }),
        this.budgetRepository.count({
          where: { status: BudgetStatus.ACCEPTED },
        }),
        this.budgetRepository.count({
          where: { status: BudgetStatus.CANCELED },
        }),
      ]);

    // Estatísticas de Ordens de Serviço
    const [activeOrders, completedOrders, canceledOrders] = await Promise.all([
      this.serviceOrderRepository.count({
        where: { status: ServiceOrderStatus.IN_PROGRESS },
      }),
      this.serviceOrderRepository.count({
        where: { status: ServiceOrderStatus.COMPLETED },
      }),
      this.serviceOrderRepository.count({
        where: { status: ServiceOrderStatus.CANCELED },
      }),
    ]);

    // Cálculo da receita total (orçamentos aceitos + ordens de serviço concluídas)
    const [budgetRevenue, orderRevenue] = await Promise.all([
      this.budgetRepository
        .createQueryBuilder('budget')
        .where('budget.status = :status', { status: BudgetStatus.ACCEPTED })
        .select('SUM(budget.totalCost)', 'total')
        .getRawOne(),
      this.serviceOrderRepository
        .createQueryBuilder('order')
        .where('order.status = :status', { status: 'completed' })
        .leftJoin('order.type', 'type')
        .select('SUM(type.price + order.additionalCost)', 'total')
        .getRawOne(),
    ]);

    const totalRevenue =
      Number(budgetRevenue?.total || 0) + Number(orderRevenue?.total || 0);

    // Adicionar mais métricas úteis
    const averageTicket =
      totalRevenue / (acceptedBudgets + completedOrders || 1);
    const conversionRate =
      (acceptedBudgets /
        (pendingBudgets + acceptedBudgets + canceledBudgets || 1)) *
      100;

    return {
      pendingBudgets,
      acceptedBudgets,
      canceledBudgets,
      activeOrders,
      completedOrders,
      canceledOrders,
      totalRevenue,
      averageTicket,
      conversionRate,
      // Adicionar período
      period: {
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date(),
      },
    };
  }

  async getRecentServices(): Promise<RecentServiceResponse[]> {
    // Buscar orçamentos recentes usando QueryBuilder para melhor controle
    const recentBudgets = await this.budgetRepository
      .createQueryBuilder('budget')
      .leftJoinAndSelect('budget.client', 'client')
      .leftJoinAndSelect('budget.serviceOrders', 'serviceOrders')
      .where('budget.deletedAt IS NULL')
      .andWhere('client.deletedAt IS NULL')
      .andWhere(
        '(serviceOrders.deletedAt IS NULL OR serviceOrders.deletedAt IS NULL)',
      )
      .orderBy('budget.createdAt', 'DESC')
      .take(5)
      .getMany();

    // Buscar ordens de serviço recentes
    const recentOrders = await this.serviceOrderRepository
      .createQueryBuilder('serviceOrder')
      .leftJoinAndSelect('serviceOrder.client', 'client')
      .leftJoinAndSelect('serviceOrder.type', 'type')
      .leftJoinAndSelect('serviceOrder.budget', 'budget')
      .where('serviceOrder.deletedAt IS NULL')
      .andWhere('client.deletedAt IS NULL')
      .andWhere('type.deletedAt IS NULL')
      .andWhere('(budget.id IS NULL OR budget.deletedAt IS NULL)') // Pega ordens avulsas ou com orçamentos não deletados
      .orderBy('serviceOrder.createdAt', 'DESC')
      .take(5)
      .getMany();

    // Mapear orçamentos válidos para o formato de resposta
    const budgetServices: RecentServiceResponse[] = recentBudgets
      .filter((budget) => {
        // Garantir que o orçamento tem cliente e está válido
        if (!budget.client || budget.client.deletedAt) return false;

        // Se tiver ordem de serviço vinculada, garantir que está válida
        if (budget.serviceOrders?.length) {
          return budget.serviceOrders.some((order) => !order.deletedAt);
        }

        return true;
      })
      .map((budget) => {
        // Encontrar a primeira ordem de serviço válida
        const validServiceOrder = budget.serviceOrders?.find(
          (order) => !order.deletedAt,
        );

        return {
          id: budget.id,
          type: 'budget',
          title: budget.name,
          status: budget.status,
          clientName: budget.client?.name || 'Cliente não informado',
          createdAt: budget.createdAt,
          totalValue: budget.totalCost,
          budgetId: budget.id,
          serviceOrderId: validServiceOrder?.id,
        };
      });

    // Mapear ordens de serviço válidas para o formato de resposta
    const orderServices: RecentServiceResponse[] = recentOrders
      .filter((order) => {
        // Filtrar apenas ordens avulsas e válidas
        return (
          !order.budget &&
          order.client &&
          !order.client.deletedAt &&
          order.type &&
          !order.type.deletedAt
        );
      })
      .map((order) => ({
        id: order.id,
        type: 'service_order',
        title: order.type?.name || 'Ordem de Serviço',
        status: order.status,
        clientName: order.client?.name || 'Cliente não informado',
        createdAt: order.createdAt,
        totalValue: (order.type?.price || 0) + (order.additionalCost || 0),
        serviceOrderId: order.id,
      }));

    // Combinar, ordenar por data e limitar aos 10 mais recentes
    const allServices = [...budgetServices, ...orderServices]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return allServices;
  }
}
