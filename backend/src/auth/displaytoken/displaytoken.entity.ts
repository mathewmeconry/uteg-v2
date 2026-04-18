import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Competition } from 'src/base/competition/competition.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Displaytoken {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition)
  competition: Promise<Competition>;

  @Field(() => Int)
  @Column()
  ground: number;

  @Column()
  @Field()
  token: string;
}
