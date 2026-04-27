import { SetMetadata } from '@nestjs/common';

export const DISPLAY_KEY = 'display';
export const Display = () => SetMetadata(DISPLAY_KEY, true);
