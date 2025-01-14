import { Client } from 'src/client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

enum VehicleStatus {
  AVAILABLE,
  UNDER_MAINTANCE,
  WAITING_MAINTENANCE,
  OUT_OF_SERVICE,
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

  @ManyToOne(() => Client, (client) => client.vehicles)
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
