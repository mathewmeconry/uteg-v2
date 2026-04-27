import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StarterLink } from '../starterLink/starterLink.entity';
import { EventEmitter } from 'stream';
import { PubSub } from 'graphql-subscriptions';

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(50);
export const GradePubSub = new PubSub({
  eventEmitter
})

export enum GradePubSubEvents {
  UPDATE = 'update',
  CREATE = 'create',
}

@ObjectType()
@Entity()
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => StarterLink)
  @ManyToOne(() => StarterLink)
  starterlink: Promise<StarterLink>;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 3 })
  value: number;

  @Field(() => Int)
  @Column()
  deviceNumber: number;

  @Column()
  module: string;
}
