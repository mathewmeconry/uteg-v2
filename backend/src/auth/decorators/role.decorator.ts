import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../types';

export const ROLE_KEY = 'role';
export const Role = (role: ROLES) => SetMetadata(ROLE_KEY, role);
