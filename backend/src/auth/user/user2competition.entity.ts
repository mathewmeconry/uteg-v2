import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Competition } from 'src/base/competition/competition.entity';
import { ROLES } from '../types';

@ObjectType()
@Entity()
export class User2Competition {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Competition)
  competition: Competition;

  @Field(() => ROLES)
  @Column()
  role: ROLES;
}
