import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SEX } from 'src/base/starter/starter.types';
import { EGTDivision } from './egtDivision.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';

@InputType()
export class EGTDivisionFilterInput {
  @Field(() => ID)
  competitionID: number;

  @Field(() => Int, { nullable: true })
  category?: number;

  @Field(() => SEX, { nullable: true })
  sex?: SEX;

  @Field(() => Int, { nullable: true })
  ground?: number;

  @Field(() => EGTDivisionStates, { nullable: true })
  state?: EGTDivisionStates;
}

@InputType()
export class CreateEGTDivisionInput {
  @Field(() => ID)
  competitionID: number;

  @Field(() => Int)
  category: number;

  @Field(() => SEX)
  sex: SEX;

  @Field(() => Int)
  ground: number;
}

@InputType()
export class UpdateEGTDivisionStateInput {
  @Field(() => ID)
  id: number;

  @Field(() => EGTDivisionStates)
  state: EGTDivisionStates;

  @Field(() => Int)
  currentRound: number;
}

@ObjectType()
export class EGTDivisionJudging {
  @Field(() => [EGTDivision])
  divisions: EGTDivision[];

  @Field(() => [EGTDivisionJudgingDevice])
  devices: EGTDivisionJudgingDevice[];
}

@ObjectType()
export class EGTDivisionJudgingDevice {
  @Field(() => Int)
  device: number;

  @Field(() => [EGTStarterLink])
  starterslist: EGTStarterLink[];

  @Field(() => Int)
  round: number;
}

export enum EGTDivisionStates {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

registerEnumType(EGTDivisionStates, { name: 'EGTDivisionStates' });
