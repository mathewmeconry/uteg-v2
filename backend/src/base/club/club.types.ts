import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateClubInput {
    @Field()
    name: string

    @Field()
    location: string
}