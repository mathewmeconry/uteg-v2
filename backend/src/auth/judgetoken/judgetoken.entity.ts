import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Competition } from 'src/base/competition/competition.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Judgetoken {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition)
  competition: Promise<Competition>;

  @Column()
  @Field(() => Int)
  device: number;

  @Field(() => Int)
  @Column()
  ground: number;

  @Column()
  @Field()
  token: string;
}
