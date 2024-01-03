import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Competition } from 'src/base/competition/competition.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EGTDivisionStates } from './egtDivision.types';

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
}
