import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../types';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => ROLES)
  @Column({ default: ROLES.VIEWER })
  globalRole: ROLES;

  @Column({ default: 'en' })
  @Field()
  language?: string;
}
