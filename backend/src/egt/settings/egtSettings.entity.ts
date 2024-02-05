import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Competition } from 'src/base/competition/competition.entity';
import { SEX } from 'src/base/starter/starter.types';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class EGTSettings {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToOne(() => Competition, { onDelete: 'CASCADE' })
  @JoinColumn()
  competition: Promise<Competition>;

  @Column('simple-json')
  @Field(() => [EGTCategorySettings])
  categorySettings: EGTCategorySettings[] = [];
}


@ObjectType()
export class EGTCategorySettings {
  @Field()
  category: number;

  @Field(() => SEX)
  sex: SEX;

  @Field()
  honourPrecentage: number;

  @Field({ nullable: true })
  coverPage?: string;
}
