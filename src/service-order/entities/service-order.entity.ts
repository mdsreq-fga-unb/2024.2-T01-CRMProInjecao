import { Client } from "../../client/entities/client.entity";
import { Product } from "../../products/entities/product.entity";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Budget } from "./budget.entity";

@Entity()
export class ServiceOrderType {
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
  })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.type)
  serviceOrders: ServiceOrder[];
}

@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ServiceOrderType, (serviceOrderType) => serviceOrderType.serviceOrders)
  type: ServiceOrderType;

  @Column()
  description: string;

  @ManyToOne(() => Client, (client) => client.serviceOrders)
  client: Client;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders)
  vehicle: Vehicle;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 2,
    nullable: true,
    default: 0,
  })
  additionalCost: number;
  
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Budget, (budget) => budget.serviceOrders, { nullable: true })
  budget: Budget;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}



