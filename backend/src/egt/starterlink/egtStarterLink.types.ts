import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class EGTStarterLinkInput {
  @Field(() => ID)
  starterLinkID: number;

  @Field(() => ID, { nullable: true })
  divisionID?: number;

  @Field({ nullable: true })
  category?: number;
}
