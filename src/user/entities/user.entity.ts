import { PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Product, (product) => product.user)
  products: Product[];
}
