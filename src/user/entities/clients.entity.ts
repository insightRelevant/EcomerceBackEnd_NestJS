import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('clients')
export class Clients {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  contactEmail: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
