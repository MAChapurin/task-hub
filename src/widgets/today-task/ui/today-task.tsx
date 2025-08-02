import { Card } from '@/shared/ui/card';
import { cn } from '@/shared/lib/css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { pluralize } from '@/shared/lib/pluralize';

type Task = {
  id: string;
  title: string;
  startDate: Date | null;
  durationHours: number | null;
  status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE';
  project: {
    title: string;
  };
};

export const TodayTasksWidget = ({ tasks }: { tasks: Task[] }) => {
  const now = new Date();
  const today = now.toDateString();
  const currentHour = now.getHours();

  const inProgressTodayTasks = tasks.filter(
    (task) => task.startDate && task.startDate.toDateString() === today
  );

  return (
    <Card className="min-h-[50vh] p-4 w-full">
      <h2 className="font-semibold text-3xl mb-4">Сегодняшние задачи</h2>
      <div className="w-full overflow-x-auto">
        <div className="relative min-w-[1440px] h-[calc(80vh-96px)]">
          <div className="absolute top-0 left-0 right-0 z-20 grid grid-cols-24 h-[30px]">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={hour}
                className="relative border-r last:border-r-0 text-center text-xs text-muted-foreground flex items-center justify-center"
              >
                <span
                  className={cn(
                    'absolute -top-0 left-1/2 -translate-x-1/2 px-1 bg-muted',
                    hour === currentHour && 'bg-yellow-50 font-semibold text-yellow-900 rounded'
                  )}
                >
                  {String(hour).padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>
          <div
            className="absolute top-[30px] left-0 right-0 bottom-0 z-0 grid grid-cols-24"
            style={{ height: 'calc(100% - 30px)' }}
          >
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="border-r last:border-r-0 h-full" />
            ))}
          </div>

          <div className="absolute top-[30px] left-0 right-0 z-10">
            <TooltipProvider delayDuration={200}>
              {inProgressTodayTasks.map((task, index) => {
                const startHour = task.startDate!.getHours();
                const duration = Math.min(task.durationHours ?? 1, 24 - startHour);
                const startTime = `${String(startHour).padStart(2, '0')}:00`;
                const endTime = `${String(startHour + duration).padStart(2, '0')}:00`;

                const taskStart = task.startDate!;
                const taskEnd = new Date(
                  taskStart.getTime() + (task.durationHours ?? 1) * 60 * 60 * 1000
                );
                const isOverdue = task.status !== 'DONE' && taskEnd < now;

                return (
                  <Tooltip key={task.id}>
                    <TooltipTrigger asChild>
                      <Card
                        className={cn(
                          'absolute px-3 py-2 text-[12px] rounded overflow-visible border',
                          'flex flex-col gap-1 justify-center',
                          isOverdue
                            ? 'bg-destructive text-destructive-foreground border-destructive'
                            : 'bg-chart-1 text-foreground border-transparent',
                          'hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer'
                        )}
                        style={{
                          top: `${index * 100}px`,
                          left: `${startHour * 60}px`,
                          width: `${duration * 60}px`,
                        }}
                      >
                        <div className="font-semibold truncate">{task.project.title}</div>
                        <div className="text-xs truncate">{task.title}</div>
                        <div className="text-xs mt-1 text-muted-foreground">
                          {task.durationHours ?? '?'} ч.
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-sm">
                      <div className="font-semibold mb-1">
                        Проект: <strong>{task.project.title}</strong>
                      </div>
                      <div className="font-semibold mb-1">Задача: {task.title}</div>
                      <div>
                        Время: {startTime} – {endTime}
                      </div>
                      <div>
                        Длительность: {task.durationHours ?? '?'}{' '}
                        {pluralize(task.durationHours || 0, ['час', 'часа', 'часов'])}
                      </div>
                      {isOverdue && (
                        <div className="text-destructive font-semibold mt-1">Просрочено</div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Card>
  );
};
