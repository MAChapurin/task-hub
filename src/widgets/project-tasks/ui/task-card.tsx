import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { pluralize } from '@/shared/lib/pluralize';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Task } from '../types';

type TaskCardProps = {
  task: Task;
  isOverlay?: boolean;
};

export function TaskCard({ task, isOverlay = false }: TaskCardProps) {
  return (
    <Card className={isOverlay ? 'cursor-grabbing' : ''}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 text-xs">
          <Badge variant="outline">Создана: {format(new Date(task.createdAt), 'dd.MM.yyyy')}</Badge>
          {task.startDate && (
            <Badge variant="secondary">
              Начата: {format(new Date(task.startDate), 'dd.MM.yyyy')}
            </Badge>
          )}
          {task.completedAt && (
            <Badge variant="default">
              Завершена: {format(new Date(task.completedAt), 'dd.MM.yyyy')}
            </Badge>
          )}
          {task.durationHours && (
            <Badge>
              <Clock className="mr-1 h-3 w-3" />
              {task.durationHours} {pluralize(task.durationHours, ['час', 'часа', 'часов'])}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
