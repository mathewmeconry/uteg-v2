import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  language: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  language: string;
}
