import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateStarterLinkInput {
  @Field(() => ID)
  starterID: number;

  @Field(() => ID)
  competitionID: number;

  @Field(() => ID)
  clubID: number;
}

@InputType()
export class UpdateStarterLinkInput {
  @Field(() => ID)
  competitionID: number;

  @Field(() => ID)
  clubID: number;
}
