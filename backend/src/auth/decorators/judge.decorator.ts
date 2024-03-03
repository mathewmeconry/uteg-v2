import { SetMetadata } from '@nestjs/common';

export const JUDGE_KEY = 'judge';
export const Judge = () => SetMetadata(JUDGE_KEY, true);
