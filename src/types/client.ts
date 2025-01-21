import { IVehicle } from './vehicle';

export type IClient = {
  cpf: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  vehicles: IVehicle[] | number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type ICreateClient = {
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
};
