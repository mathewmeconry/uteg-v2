import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import fs from 'fs/promises';

@ObjectType()
@Entity()
export class Competition {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column('timestamp')
  startDate: Date;

  @Field()
  @Column('timestamp')
  endDate: Date;

  @Field(() => Int)
  @Column({ default: 1 })
  grounds: number = 1;

  @Field(() => [String])
  @Column('simple-array')
  modules: string[];

  @Column({ default: '' })
  logoPath: string;
}
