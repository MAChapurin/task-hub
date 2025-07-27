import { Badge } from '@/shared/ui/badge';
import { CheckIcon, ClockIcon, LoaderIcon } from 'lucide-react';
import { FC } from 'react';

type StatusBadgeProps = {
  status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE';
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    BACKLOG: { label: 'Ожидает', color: 'bg-gray-500', icon: ClockIcon },
    IN_PROGRESS: { label: 'В работе', color: 'bg-blue-600', icon: LoaderIcon },
    DONE: { label: 'Завершён', color: 'bg-green-600', icon: CheckIcon },
  };

  const { label, color } = statusMap[status];
  const Icon = statusMap[status].icon;

  return (
    <Badge className={`${color} text-white`}>
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
};
