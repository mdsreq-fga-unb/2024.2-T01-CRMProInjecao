import { Client } from '../../client/entities/client.entity';
import { ServiceOrder } from '../../service-order/entities/service-order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: '',
  })
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => Client, (client) => client.feedbacks, { nullable: false })
  client: Client;

  @ManyToMany(() => ServiceOrder)
  @JoinTable()
  serviceOrders: ServiceOrder[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
