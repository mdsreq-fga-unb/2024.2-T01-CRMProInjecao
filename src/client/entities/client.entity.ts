import { ServiceOrder } from '../../service-order/entities/service-order.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
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

@Entity()
export class Client {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.client)
  vehicles: Vehicle[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.client)
  serviceOrders: ServiceOrder[];

  @OneToMany(() => Budget, (budget) => budget.client)
  budgets: Budget[];

  
}
