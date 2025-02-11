export enum ServiceHistoryType {
  BUDGET_CREATED = 'budget_created',
  BUDGET_UPDATED = 'budget_updated',
  BUDGET_ACCEPTED = 'budget_accepted',
  BUDGET_CANCELED = 'budget_canceled',
  SERVICE_ORDER_CREATED = 'service_order_created',
  SERVICE_ORDER_UPDATED = 'service_order_updated',
  SERVICE_ORDER_COMPLETED = 'service_order_completed',
  SERVICE_ORDER_CANCELED = 'service_order_canceled',
}

export interface IServiceHistory {
  id: string;
  type: ServiceHistoryType;
  description: string;
  changes: Record<string, any>;
  budget?: {
    id: string;
    name: string;
  };
  serviceOrder?: {
    id: string;
    type: {
      name: string;
    };
  };
  createdAt: Date;
} 