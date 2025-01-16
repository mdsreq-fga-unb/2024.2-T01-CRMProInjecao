import { IVehicle } from './vehicle';

export type IClient = {
  cpf: string;

  name: string;

  email: string;

  phoneNumber: string;

  address: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  vehicles: IVehicle[] | number;
};

export type createClient = {
  name: string;

  email: string;

  phoneNumber: string;

  address?: string;
};
