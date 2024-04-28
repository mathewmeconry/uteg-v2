import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EGTDivision } from '../division/egtDivision.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { EGTDevice } from '../device/egtDevice.entity';

@ObjectType()
@Entity()
export class EGTLineup {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => EGTDivision, { onDelete: 'CASCADE' })
  division: Promise<EGTDivision>;

  @OneToMany(() => EGTStarterLink, (starterLink) => starterLink.lineup)
  starterlinks: Promise<EGTStarterLink[]>;

  @ManyToOne(() => EGTDevice)
  device: Promise<EGTDevice>;
}
