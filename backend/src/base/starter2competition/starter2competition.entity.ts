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
  starter: Promise<Starter>;

  @ManyToOne(() => Competition)
  competition: Promise<Competition>;

  @ManyToOne(() => Club, { nullable: true })
  club?: Promise<Club>;
}
