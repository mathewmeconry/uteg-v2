import { Field, ID, ObjectType, createUnionType } from '@nestjs/graphql';
import { Competition } from 'src/base/competition/competition.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EGTDeviceAggregationMode } from './egtDevice.types';

@Entity()
@ObjectType()
export class EGTDevice {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Competition, { onDelete: 'CASCADE' })
  competition: Promise<Competition>;

  @Column()
  @Field()
  deviceNumber: number;

  @Column({ default: 1 })
  @Field()
  inputs: number = 1;

  @Column({ default: EGTDeviceAggregationMode.NONE })
  @Field(() => EGTDeviceAggregationMode)
  aggregationMode: EGTDeviceAggregationMode = EGTDeviceAggregationMode.NONE;

  @Column('simple-json', { default: '[]' })
  @Field(() => [EGTDeviceOverride])
  overrides: EGTDeviceOverride[];
}

@ObjectType()
export class EGTDeviceOverride {
  @Field()
  category: number;

  @Field()
  inputs: number;

  @Field(() => EGTDeviceAggregationMode)
  aggregationMode: EGTDeviceAggregationMode;
}
