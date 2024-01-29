import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GradeInput {
  @Field(() => ID)
  starterlinkId: number;

  @Field(() => Float)
  value: number;

  @Field(() => Int)
  deviceNumber: number;

  @Field()
  module: string;
}
