import { IVehicle } from './vehicle';

export type IClient = {
  cpf: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  vehicles: IVehicle[];
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

export type IUpdateClient = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
};
