
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    nullable: true,
  })
  user: User | null;

  @Column()
  token: string;

  @Column({ type: "varchar", default: null, nullable: true })
  description: string | null;

  @Column()
  expirationDate: Date;
}
