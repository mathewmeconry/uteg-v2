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
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { PubSub } from 'graphql-subscriptions';

export const EGTDivisionPubSub = new PubSub();

export enum EGTDivisionPubSubEvents {
  UPDATE = 'update',
  CREATE = 'create',
}

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
  @Column({ default: EGTDivisionStates.PENDING })
  state: EGTDivisionStates;

  @Field(() => Int)
  @Column({ default: 0 })
  currentRound: number;

  @OneToMany(() => EGTLineup, (lineup) => lineup.division)
  lineups: Promise<EGTLineup[]>;

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

  @Field(() => Date, { nullable: true })
  @Column('datetime', { nullable: true })
  lastStateTransition?: Date;

  @OneToMany(() => EGTStarterLink, (link) => link.division)
  starterLinks: Promise<EGTStarterLink[]>;

  get totalRounds(): number {
    switch (this.sex) {
      case SEX.MALE:
        return 5;
      case SEX.FEMALE:
        return 4;
      default:
        return 0;
    }
  }
}
