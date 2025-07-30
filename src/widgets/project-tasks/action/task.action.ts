'use server';

import { prisma } from '@/shared/lib/db';

export async function updateTaskStatus(
  id: string,
  status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE',
  startDate: Date | null,
  completedAt: Date | null
) {
  return prisma.task.update({
    where: { id },
    data: { status, startDate, completedAt },
  });
}
