import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { Models } from './models.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @JoinTable()
  @OneToMany(() => Models, (models) => models.products)
  models: Models[];
}
