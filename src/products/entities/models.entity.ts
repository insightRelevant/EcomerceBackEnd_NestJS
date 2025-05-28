/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('models')
export class Models {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    model: string; 
    
    @ManyToMany(()=> Product, (product) => product.models)
    products: Product[]
}