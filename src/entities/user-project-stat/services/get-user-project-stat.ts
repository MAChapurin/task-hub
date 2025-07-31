import { userProjectStatRepository } from '../repositories/user-project-stat.repository';
import { Either, left, right } from '@/shared/lib/either';

export type UserProjectStat = {
  date: string;
  projects: number;
};

export const getUserProjectStat = async (
  userId: string
): Promise<Either<'unknown-error', UserProjectStat[]>> => {
  try {
    const rawStats = await userProjectStatRepository.getByUserId(userId);

    const formattedStats: UserProjectStat[] = rawStats.map((stat) => ({
      date: stat.date.toISOString(),
      projects: stat.projects,
    }));

    return right(formattedStats);
  } catch (error) {
    console.error('Ошибка при получении статистики проектов пользователя:', error);
    return left('unknown-error');
  }
};
