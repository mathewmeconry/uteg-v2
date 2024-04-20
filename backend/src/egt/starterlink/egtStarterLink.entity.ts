import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { EGTDivision } from '../division/egtDivision.entity';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';
import { EGTLineup } from '../lineup/egtLineup.entity';
import { PubSub } from 'graphql-subscriptions';

export const EGTStarterLinkPubSub = new PubSub()

export enum EGTStarterLinkPubSubEvents {
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
}

@ObjectType()
@Entity()
export class EGTStarterLink {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => EGTDivision, { nullable: true, onDelete: 'SET NULL' })
  division?: Promise<EGTDivision>;

  @RelationId((link: EGTStarterLink) => link.division)
  divisionID?: number;

  @OneToOne(() => StarterLink, { onDelete: 'CASCADE' })
  @JoinColumn()
  starterLink: Promise<StarterLink>;

  @RelationId((link: EGTStarterLink) => link.starterLink)
  starterLinkId: number;

  @ManyToOne(() => EGTLineup, { nullable: true, onDelete: 'SET NULL' })
  lineup?: Promise<EGTLineup>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  category?: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
