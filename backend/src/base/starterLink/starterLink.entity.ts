import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Starter } from '../starter/starter.entity';
import { Club } from '../club/club.entity';
import { Competition } from '../competition/competition.entity';

@ObjectType()
@Entity()
export class StarterLink {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Starter, { onDelete: 'CASCADE' })
  starter: Promise<Starter>;

  @RelationId((starterLink: StarterLink) => starterLink.starter)
  starterId: number;

  @ManyToOne(() => Competition, { onDelete: 'CASCADE' })
  competition: Promise<Competition>;

  @RelationId((starterLink: StarterLink) => starterLink.competition)
  competitionId: number;

  @ManyToOne(() => Club, { nullable: true })
  club?: Promise<Club>;

  @RelationId((starterLink: StarterLink) => starterLink.club)
  clubId?: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
