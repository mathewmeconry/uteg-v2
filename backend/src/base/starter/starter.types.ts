import {
  Field,
  ID,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class CreateStarterInput {
  @Field({ nullable: true })
  stvID?: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  birthyear: number;

  @Field(() => SEX)
  sex: SEX;
}

@InputType()
export class StarterFilter {
  @Field(() => ID, { nullable: true })
  competitionID: number;

  @Field(() => SEX, { nullable: true })
  sex?: SEX;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  stvID?: string;
}

@InputType()
export class UpdateStarterInput extends PartialType(CreateStarterInput) {}

export enum SEX {
  MALE = 'male',
  FEMALE = 'female',
}
registerEnumType(SEX, { name: 'Sex' });
