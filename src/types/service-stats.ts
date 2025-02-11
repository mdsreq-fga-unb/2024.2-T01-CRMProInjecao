import { IBudget } from './budget';
import { IServiceOrder } from './service-order';

export type RecentService = IBudget | IServiceOrder;

export interface ServiceStats {
  pendingBudgets: number;
  acceptedBudgets: number;
  canceledBudgets: number;
  activeOrders: number;
  completedOrders: number;
  canceledOrders: number;
  totalRevenue: number;
} 