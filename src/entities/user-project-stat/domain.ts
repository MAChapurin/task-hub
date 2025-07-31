import { UserProjectStat } from '@prisma/client';

export type UserProjectStatEntry = Pick<UserProjectStat, 'date' | 'projects'>;
