import { ServiceOrder } from '../../service-order/entities/service-order.entity';
import { Client } from '../../client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Budget } from '../../service-order/entities/budget.entity';

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  UNDER_MAINTANCE = 'UNDER_MAINTANCE',
  WAITING_MAINTENANCE = 'WAITING_MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

@Entity()
export class Vehicle {
  @PrimaryColumn()
  licensePlate: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column({ type: 'date', nullable: true })
  fabricationDate: Date;

  @Column({ type: 'int' })
  modelYear: number;

  @Column()
  color: string;

  @Column({ nullable: true })
  renavam: string;

  @Column({ nullable: true })
  fuelType: string;

  @Column({ nullable: true })
  chassiNumber: string;

  @Column({ type: 'int', nullable: false })
  currentMileage: number;

  @Column({ type: 'text', nullable: true })
  descritpion: string;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.AVAILABLE,
  })
  status: VehicleStatus;

  @ManyToOne(() => Client, (client) => client.vehicles, {
    nullable: false,
    cascade: ['update', 'soft-remove', 'recover'],
  })
  client: Client;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.vehicle)
  serviceOrders: ServiceOrder[];

  @OneToMany(() => Budget, (budget) => budget.vehicle)
  budgets: Budget[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
