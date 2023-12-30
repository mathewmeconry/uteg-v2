import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Competition } from 'src/base/competition/competition.entity';
import { ROLES } from '../types';

@ObjectType()
@Entity()
export class UserLink {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: Promise<User>;

  @ManyToOne(() => Competition)
  competition: Promise<Competition>;

  @Field(() => ROLES)
  @Column()
  role: ROLES;
}
