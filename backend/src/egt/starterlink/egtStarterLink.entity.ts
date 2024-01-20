import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EGTDivision } from '../division/egtDivision.entity';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTLineup } from '../lineup/egtLineup.entity';

@ObjectType()
@Entity()
export class EGTStarterLink {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => EGTDivision)
  division: Promise<EGTDivision>;

  @OneToOne(() => StarterLink, { onDelete: 'CASCADE' })
  @JoinColumn()
  starterLink: Promise<StarterLink>;

  @ManyToOne(() => EGTLineup, { nullable: true, onDelete: 'SET NULL' })
  lineup?: Promise<EGTLineup>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  category?: number;
}
