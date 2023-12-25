import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Competition } from '../competition/competition.entity';

@ObjectType()
@Entity()
export class Judgetoken {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition)
  competition: Competition;

  @Column()
  device: number;

  @Field(() => Int)
  @Column()
  ground: number;
}
