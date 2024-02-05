import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { SEX } from 'src/base/starter/starter.types';
import { EGTCategorySettings } from './egtSettings.entity';

@InputType()
export class EGTSettingsInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => [EGTCategorySettingsInput])
  categorySettings: EGTCategorySettingsInput[];
}

@InputType()
export class EGTCategorySettingsInput extends EGTCategorySettings {
    @Field()
    category: number;
  
    @Field(() => SEX)
    sex: SEX;
  
    @Field()
    honourPrecentage: number;
  
    @Field({ nullable: true })
    coverPage?: string;
}
