import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Competition } from 'src/base/competition/competition.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EGTDivisionStates } from './egtDivision.types';
import { EGTLineup } from '../lineup/egtLineup.entity';
import { SEX } from 'src/base/starter/starter.types';

@ObjectType()
@Entity()
export class EGTDivision {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  @Column()
  ground: number;

  @ManyToOne(() => Competition)
  competition: Promise<Competition>;

  @Field(() => EGTDivisionStates)
  @Column()
  state: EGTDivisionStates;

  @Field(() => Int)
  @Column({ default: 0 })
  round: number;

  @OneToMany(() => EGTLineup, (lineup) => lineup.division)
  lineups: EGTLineup[];

  @Field(() => Int)
  @Column()
  category: number;

  @Field(() => SEX)
  @Column()
  sex: SEX;

  // nth division for category, sex and competition combination
  // starting with 1 for ease in the frontend
  @Field(() => Int)
  @Column()
  number: number; 
}
