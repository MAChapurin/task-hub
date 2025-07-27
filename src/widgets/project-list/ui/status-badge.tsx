import { Badge } from '@/shared/ui/badge';
import { FC } from 'react';

type StatusBadgeProps = {
  status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE';
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    BACKLOG: { label: 'Ожидает', color: 'bg-gray-500' },
    IN_PROGRESS: { label: 'В работе', color: 'bg-blue-600' },
    DONE: { label: 'Завершён', color: 'bg-green-600' },
  };

  const { label, color } = statusMap[status];

  return <Badge className={`${color} text-white`}>{label}</Badge>;
};
