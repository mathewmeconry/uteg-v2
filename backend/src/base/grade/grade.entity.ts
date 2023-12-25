import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Starter2Competition } from '../starter2competition/starter2competition.entity';

@ObjectType()
@Entity()
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Starter2Competition)
  starter: Starter2Competition;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 3 })
  value: number;

  @Column()
  device: number;

  @Column()
  module: string;
}
