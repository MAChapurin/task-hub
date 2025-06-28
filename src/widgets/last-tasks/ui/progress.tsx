import { cn } from '@/shared/lib/css';

type ProgressProps = {
  value: number;
  background?: string;
};

export const Progress = ({ value, background = 'bg-chart-1' }: ProgressProps) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full h-12 bg-muted rounded-full overflow-hidden relative">
      <div
        className={cn('h-full transition-all duration-500 ease-in-out relative', background)}
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-4 font-medium text-white">
          {percentage === 100 ? 'done' : `${percentage}%`}
        </div>
      </div>
    </div>
  );
};
