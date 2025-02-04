export enum UserRole {
  ADMIN = 1,
  USER,
}

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateUser = {
  name: string;
  email: string;
  role: number;
  isActive: boolean;
};

export type IUpdateUser = Partial<ICreateUser>;
