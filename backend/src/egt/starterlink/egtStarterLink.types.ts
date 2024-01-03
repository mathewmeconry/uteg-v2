import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEGTStarterLinkInput {
  @Field(() => ID)
  starterLinkID: number;

  @Field(() => ID)
  divisionID: number;
}
