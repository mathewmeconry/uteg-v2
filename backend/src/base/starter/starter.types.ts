import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';

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
  @Field(() => ID)
  competitionID: number

  @Field(() => SEX, {nullable: true})
  sex?: SEX

  @Field({nullable: true})
  category?: number
}

export enum SEX {
  MALE = 'male',
  FEMALE = 'female',
}
registerEnumType(SEX, { name: 'Sex' });
