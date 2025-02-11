export type IServiceOrderType = {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type IServiceOrder = {
  id: string;
  type: IServiceOrderType;
  status: ServiceOrderStatus;
  description: string;
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
    costPrice: number;
    sellPrice: number;
  }>;
  budget?: {
    id: string;
    name: string;
    status: string;
  } | null;
  additionalCost: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateServiceOrder = {
  typeId: string;
  description: string;
  clientCPF: string;
  vehicleLicensePlate: string;
  additionalCost?: number;
  productIds?: string[];
};

export type IUpdateServiceOrder = {
  typeId?: string;
  description?: string;
  clientCPF?: string;
  vehicleLicensePlate?: string;
  additionalCost?: number;
  productIds?: string[];
  status?: ServiceOrderStatus;
};

export type ICreateServiceOrderType = {
  name: string;
  description: string;
  price?: number;
};

export type IUpdateServiceOrderType = {
  name?: string;
  description?: string;
  price?: number;
}; 

export type IServiceOrderStatus = {
  id: string;
  name: string;
  description: string;
};

export enum ServiceOrderStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}