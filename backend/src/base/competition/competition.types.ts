import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';

@InputType()
export class CreateCompetitionInput {
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

@InputType()
export class UpdateCompetitionInput extends PartialType(
  CreateCompetitionInput,
) {
  @Field(() => [String], { nullable: true })
  modules?: string[];

  @Field({ defaultValue: false })
  deleteLogo: boolean;
}

@ObjectType()
export class CompetitionStats {
  @Field(() => Int)
  starters: number;

  @Field(() => Int)
  clubs: number;

  @Field(() => Int)
  grades: number;
}
