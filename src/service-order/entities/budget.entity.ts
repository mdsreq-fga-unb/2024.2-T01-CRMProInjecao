import { Client } from '../../client/entities/client.entity';
import { Product } from '../../products/entities/product.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceOrder, ServiceOrderType } from './service-order.entity';

export enum BudgetStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  CANCELED = 'canceled',
}

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 2,
    nullable: true,
    default: 0,
  })
  initialCost: number;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 2,
    nullable: true,
    default: 0,
  })
  additionalCost: number;

  @Column({
    type: 'enum',
    enum: BudgetStatus,
    default: BudgetStatus.PENDING,
  })
  status: BudgetStatus;

  @ManyToOne(() => Client, (client) => client.budgets)
  client: Client;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.budgets)
  vehicle: Vehicle;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToMany(() => ServiceOrderType)
  @JoinTable()
  serviceTypes: ServiceOrderType[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.budget)
  serviceOrders: ServiceOrder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalCost: number;

  @BeforeUpdate()
  async updateTotalCost() {
    this.totalCost = this.initialCost + this.additionalCost;
  }

  @BeforeInsert()
  async setTotalCost() {
    this.totalCost = this.initialCost + this.additionalCost;
  }
}
