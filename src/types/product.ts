import { ICategory } from './category';

export type IProduct = {
  id: string;

  name: string;

  description: string;

  brand: string;

  costPrice: number;

  sellPrice: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  categories: ICategory[];
};

export type CreateProductDTO = {
  name: string;

  description?: string;

  brand?: string;

  costPrice: number;

  sellPrice: number;

  categories: string[];
};
