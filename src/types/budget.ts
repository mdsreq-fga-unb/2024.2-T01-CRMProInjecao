export enum BudgetStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  CANCELED = 'canceled'
}

export type IBudget = {
  id: string;
  name: string;
  description: string;
  initialCost: number;
  additionalCost: number;
  totalCost: number;
  status: BudgetStatus;
  client: {
    cpf: string;
    name: string;
  };
  vehicle: {
    licensePlate: string;
    model: string;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  serviceTypes: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  serviceOrders: Array<{
    id: string;
    description: string;
    products?: Array<{
      id: string;
      name: string;
      costPrice: number;
      sellPrice: number;
    }>;
    additionalCost?: number;
    type: {
      id: string;
      name: string;
      price: number;
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateBudget = {
  name: string;
  description: string;
  initialCost?: number;
  additionalCost?: number;
  clientCPF: string;
  vehicleLicensePlate: string;
  productIds?: string[];
  serviceTypeIds?: string[];
};

export type IUpdateBudget = {
  name?: string;
  description?: string;
  initialCost?: number;
  additionalCost?: number;
  status?: BudgetStatus;
  clientCPF?: string;
  vehicleLicensePlate?: string;
  productIds?: string[];
  serviceTypeIds?: string[];
}; 