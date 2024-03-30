import { registerEnumType } from '@nestjs/graphql';

export enum ROLES {
  'STARTER' = 0,
  'JUDGE' = 5,
  'VIEWER' = 10,
  'ADMIN' = 99,
}

registerEnumType(ROLES, {
  name: 'Roles',
});

export type AuthContext = {
  competition?: number;
};
