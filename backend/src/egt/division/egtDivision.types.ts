import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { SEX } from 'src/base/starter/starter.types';

@InputType()
export class EGTDivisionFilterInput {
  @Field(() => ID)
  competitionID: number;

  @Field(() => Int, { nullable: true })
  category?: number;

  @Field(() => SEX, { nullable: true })
  sex?: SEX;
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
  state: EGTDivisionStates

  @Field(() => Int)
  currentRound: number
}

export enum EGTDivisionStates {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

registerEnumType(EGTDivisionStates, { name: 'EGTDivisionStates' });
