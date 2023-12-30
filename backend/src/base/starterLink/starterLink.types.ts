import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStarterLinkInput {
  @Field(() => ID)
  starterID: number;

  @Field(() => ID)
  competitionID: number;

  @Field(() => ID)
  clubID: number;
}
