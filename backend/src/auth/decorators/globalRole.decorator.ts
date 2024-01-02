import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../types';

export const GLOBAL_ROLE_KEY = 'global_role';
export const GlobalRole = (role: ROLES) => SetMetadata(GLOBAL_ROLE_KEY, role);
