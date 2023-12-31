import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SEX } from './starter.types';
import { StarterLink } from '../starterLink/starterLink.entity';

@ObjectType()
@Entity()
export class Starter {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
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

  @OneToMany(() => StarterLink, (starterLink) => starterLink.starter)
  starterLinks: Promise<StarterLink[]>;
}
