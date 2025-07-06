import { cn } from '@/shared/lib/css';
import { Percent } from '@/shared/types';

type ProgressProps = {
  value: Percent;
  background?: string;
};

export const Progress = ({ value }: ProgressProps) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full h-12 bg-muted rounded-full overflow-hidden relative">
      <div
        className={cn('h-full transition-all duration-500 ease-in-out relative', {
          ['bg-chart-1']: value <= 33,
          ['bg-chart-4']: value > 33 && value <= 66,
          ['bg-chart-2']: value > 66 && value <= 100,
        })}
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-4 font-medium text-white">
          {percentage === 100 ? 'done' : `${percentage}%`}
        </div>
      </div>
    </div>
  );
};
