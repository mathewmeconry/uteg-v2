import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Starter } from '../starter/starter.entity';
import { Club } from '../club/club.entity';
import { Competition } from '../competition/competition.entity';

@ObjectType()
@Entity()
export class Starter2Competition {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Starter)
  starter: Starter;

  @ManyToOne(() => Competition)
  competition: Competition;

  @ManyToOne(() => Club)
  club: Club;

  @Field(() => Int)
  @Column()
  category: number;

  @Field()
  @Column()
  role: string;
}
