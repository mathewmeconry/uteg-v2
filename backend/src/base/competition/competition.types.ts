import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCompetition {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => Int, { defaultValue: 1 })
  grounds: number;

  @Field(() => [String], { defaultValue: [] })
  modules: string[];
}
