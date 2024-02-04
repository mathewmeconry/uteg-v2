import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';
import { Grade } from 'src/base/grade/grade.entity';

@ObjectType()
export class EGTStarterRanking {
  @Field()
  rank: number;

  @Field(() => Float)
  total: number;

  @Field()
  award: Award;

  egtStarterlink: EGTStarterLink;

  grades: Grade[];
}

export enum Award {
  GOLD = 'gold',
  SILVER = 'silver',
  BRONZE = 'bronze',
  HONOUR = 'honour',
  NONE = ''
}

registerEnumType(Award, { name: 'EGTAward' });
