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

export enum EGTDivisionStates {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

registerEnumType(EGTDivisionStates, { name: 'EGTDivisionStates' });
