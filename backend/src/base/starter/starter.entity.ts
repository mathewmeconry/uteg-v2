import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SEX } from './starter.types';
import { Starter2Competition } from '../starter2competition/starter2competition.entity';

@ObjectType()
@Entity()
export class Starter {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stvID?: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  birthyear: number;

  @Field(() => SEX)
  @Column()
  sex: SEX;

  @OneToMany(
    () => Starter2Competition,
    (starter2competition) => starter2competition.starter,
  )
  starter2competitions: Promise<Starter2Competition[]>;
}
