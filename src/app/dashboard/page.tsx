import { Stats } from '@/shared/ui/stats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for tasks',
};

export default function DashboardPage() {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex flex-col gap-4 items-stretch w-full max-w-full lg:max-w-2xs">
        <Stats
          title="Active Projects"
          stats="92"
          src="/project-stats-icons/active-projects.svg"
          backgroundColor="bg-violet-400"
        />
        <Stats
          title="On going Projects"
          stats="35"
          src="/project-stats-icons/ongoing-projects.svg"
          backgroundColor="bg-amber-200"
        />
        <Stats
          title="Working hours"
          stats="19h 9m"
          src="/project-stats-icons/working-hours.svg"
          backgroundColor="bg-pink-200"
        />
      </div>
      <div className="bg-violet-300 rounded-2xl min-w-2xs grow min-h-96"></div>
    </div>
  );
}
