import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EGTDivision } from '../division/egtDivision.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';

@ObjectType()
@Entity()
export class EGTLineup {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => EGTDivision, { onDelete: 'CASCADE' })
  division: EGTDivision;

  @OneToMany(() => EGTStarterLink, (starterLink) => starterLink.lineup)
  starterlinks: EGTStarterLink[];

  @Field(() => ID)
  @Column()
  device: number;
}
