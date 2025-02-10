export enum IVehicleStatus {
  AVAILABLE = 'AVAILABLE',
  UNDER_MAINTANCE = 'UNDER_MAINTANCE',
  WAITING_MAINTENANCE = 'WAITING_MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

export type IVehicle = {
  licensePlate: string;

  model: string;

  brand: string;

  fabricationDate: Date;

  modelYear: number;

  color: string;

  renavam: string;

  fuelType: string;

  chassiNumber: string;

  currentMileage: number;

  descritpion: string;

  status: IVehicleStatus | string;

  client: {
    cpf: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
};

export type createVehicle = {
  licensePlate: string;

  model: string;

  brand: string;

  fabricationDate?: Date;

  modelYear: number;

  color: string;

  renavam?: string;

  fuelType?: string;

  chassiNumber?: string;

  currentMileage: number;

  descritpion?: string;

  status: IVehicleStatus | string;

  clientCPF: string;
};

export type IupdateVehicle = {
  licensePlate?: string;
  model?: string;

  brand?: string;

  fabricationDate?: Date;

  modelYear?: number;

  color?: string;

  renavam?: string;

  fuelType?: string;

  chassiNumber?: string;

  currentMileage?: number;

  descritpion?: string;

  status?: IVehicleStatus | string;
};
