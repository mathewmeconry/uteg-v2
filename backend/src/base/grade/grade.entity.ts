import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StarterLink } from '../starterLink/starterLink.entity';

@ObjectType()
@Entity()
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => StarterLink)
  @ManyToOne(() => StarterLink)
  starter: Promise<StarterLink>;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 3 })
  value: number;

  @Column()
  device: number;

  @Column()
  module: string;
}
