import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column('simple-json') //le decimos que se trata de un json
  tags: string[];

  @OneToMany(() => Review, (review) => review.productId)
  reviews: Review[];
}
