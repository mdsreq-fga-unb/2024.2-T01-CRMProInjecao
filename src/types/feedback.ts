export type IFeedback = {
  id: number;
  description: string;
  rating: number;
  client: {
    cpf: string;
    name: string;
  };
  serviceOrders: Array<{
    id: string;
    // outros campos relevantes do service order se necessário
  }>;
  createdAt: Date;
};

export type ICreateFeedback = {
  description?: string;
  rating: number;
  clientCPF: string;
  serviceOrderIds?: string[];
};

export type IUpdateFeedback = {
  description?: string;
  rating?: number;
  clientCPF?: string;
  serviceOrderIds?: string[];
}; 