import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column( { default: "" } )
    description: string;

    @Column( { default: "" } )
    brand: string;

    @Column({
        type: "decimal",
        precision: 11,
        scale: 2,
        nullable: true,
    })
    costPrice: number;

    @Column({
        type: "decimal",
        precision: 11,
        scale: 2,
        nullable: true,
    })
    sellPrice: number;
   
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;  

    @ManyToMany(() => Category, { cascade: ["insert", "update"] })
    @JoinTable()
    categories: Category[];
}
