import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EGTStarterLinkInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => ID, { nullable: true })
  starterLinkID?: number;

  @Field(() => ID, { nullable: true })
  divisionID?: number;

  @Field(() => Int, { nullable: true })
  divisionNumber?: number;

  @Field({ nullable: true })
  category?: number;

  @Field(() => ID, { nullable: true })
  lineupID?: number;
}
