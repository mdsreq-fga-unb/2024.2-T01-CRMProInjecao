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
  description: string;
  client: {
    cpf: string;
    name: string;
  };
  vehicle: {
    licensePlate: string;
    model: string;
  };
  additionalCost: number;
  products: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  budget?: {
    id: string;
    name: string;
  };
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