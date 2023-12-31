import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Competition, { onDelete: 'CASCADE' })
  competition: Promise<Competition>;

  @ManyToOne(() => Club, { nullable: true })
  club?: Promise<Club>;
}
