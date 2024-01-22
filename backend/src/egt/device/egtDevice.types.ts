import { registerEnumType } from '@nestjs/graphql';

export enum EGTDeviceAggregationMode {
  'NONE' = 'none',
  'AVG' = 'avg',
  'MAX' = 'max',
  'MIN' = 'min',
}

registerEnumType(EGTDeviceAggregationMode, {
  name: 'EGTDeviceAggregationMode',
});
