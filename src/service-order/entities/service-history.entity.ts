import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Budget } from './budget.entity';
import { ServiceOrder } from './service-order.entity';

export enum ServiceHistoryType {
  BUDGET_CREATED = 'budget_created',
  BUDGET_UPDATED = 'budget_updated',
  BUDGET_ACCEPTED = 'budget_accepted',
  BUDGET_CANCELED = 'budget_canceled',
  SERVICE_ORDER_CREATED = 'service_order_created',
  SERVICE_ORDER_UPDATED = 'service_order_updated',
  SERVICE_ORDER_COMPLETED = 'service_order_completed',
  SERVICE_ORDER_CANCELED = 'service_order_canceled',
}

@Entity()
export class ServiceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ServiceHistoryType,
  })
  type: ServiceHistoryType;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  changes: Record<string, any>;

  @ManyToOne(() => Budget, { nullable: true })
  @JoinColumn()
  budget: Budget;

  @ManyToOne(() => ServiceOrder, { nullable: true })
  @JoinColumn()
  serviceOrder: ServiceOrder;

  @Column({ type: 'uuid', nullable: true })
  userId: string; // Para registrar qual usuário fez a alteração

  @CreateDateColumn()
  createdAt: Date;
}
