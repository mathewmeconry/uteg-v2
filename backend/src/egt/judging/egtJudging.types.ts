import { ObjectType, Int, Field } from '@nestjs/graphql';
import { EGTDevice } from '../device/egtDevice.entity';
import { EGTStarterLink } from '../starterlink/egtStarterLink.entity';

@ObjectType()
export class EGTJudgingDevice {
  @Field(() => EGTDevice)
  device: EGTDevice;

  @Field(() => [EGTStarterLink])
  starterslist: EGTStarterLink[];

  @Field(() => Int)
  round: number;
}
