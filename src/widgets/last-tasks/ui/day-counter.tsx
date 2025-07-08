import { cn } from '@/shared/lib/css';
import { getDaysUntil } from '../utils/getDaysUntil';

interface DayCounterProps {
  dueDate: Date;
}

export const DayCounter = ({ dueDate }: DayCounterProps) => {
  const restDay = getDaysUntil(dueDate);
  const dayCount = `${restDay} ${restDay === 1 ? 'day' : 'days'}`;

  return (
    <span
      className={cn('transition-colors', {
        ['text-destructive']: restDay < 0,
      })}
    >
      Due: {dayCount}
    </span>
  );
};
