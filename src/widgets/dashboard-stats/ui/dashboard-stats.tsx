import { pluralize } from '@/shared/lib/pluralize';
import { Stats } from '@/shared/ui/stats';
import { ProjectsStatistic } from '@/widgets/projects-statistic';
import { DashboardStatsProps } from '../types/dashboard-stats.props';

export function DashboardStats({
  activeTasks,
  projectsCount,
  workingHours,
  stats,
}: DashboardStatsProps) {
  return (
    <div className="flex flex-wrap xl:grid xl:grid-cols-3 gap-4 mb-4">
      <section className="flex flex-col gap-4 items-stretch w-full max-w-full">
        <h2 className="sr-only">
          Текущие количество активных проектов, задач и количество потраченного времени
        </h2>
        <Stats
          title={pluralize(projectsCount, ['Проект', 'Проекта', 'Проектов'])}
          stats={String(projectsCount)}
          src="/project-stats-icons/active-projects.svg"
          backgroundColor="bg-[var(--chart-1)]"
        />
        <Stats
          title={pluralize(activeTasks, ['Задача', 'Задачи', 'Задач'])}
          stats={String(activeTasks)}
          src="/project-stats-icons/ongoing-projects.svg"
          backgroundColor="bg-[var(--chart-4)]"
        />
        <Stats
          title={pluralize(workingHours, ['Рабочий час', 'Рабочих часа', 'Рабочих часов'])}
          stats={String(workingHours)}
          src="/project-stats-icons/working-hours.svg"
          backgroundColor="bg-[var(--chart-3)]"
        />
      </section>
      <section className="xl:col-span-2 min-h-105 w-full">
        <h2 className="sr-only">Статистика количества проектов по дням и месяцам</h2>
        <ProjectsStatistic stats={stats} />
      </section>
    </div>
  );
}
