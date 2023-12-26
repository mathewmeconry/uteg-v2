import { Field, InputType } from '@nestjs/graphql';

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

  @Field()
  email: string;

  @Field()
  password: string;
}
