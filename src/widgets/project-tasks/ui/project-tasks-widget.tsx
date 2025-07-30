import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { getProjectById } from '@/entities/project/services/get-project-by-id';
import { getTasksByProject } from '@/entities/task/services/get-tasks-by-project';
import { matchEither } from '@/shared/lib/either';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

type Props = {
  projectId: string;
};

export async function ProjectTasksWidgetServer({ projectId }: Props) {
  const projectResult = await getProjectById(projectId);
  const tasksResult = await getTasksByProject(projectId);

  const project = matchEither(projectResult, {
    right: (data) => data,
    left: () => null,
  });

  const tasks = matchEither(tasksResult, {
    right: (data) => data,
    left: () => [],
  });

  if (!project) {
    return <p className="text-sm text-muted-foreground">Проект не найден</p>;
  }

  const groupedTasks = {
    BACKLOG: tasks.filter((t) => t.status === 'BACKLOG'),
    IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter((t) => t.status === 'DONE'),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-xl">
          {project.icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{project.title}</h2>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.owner.avatarUrl ?? ''} />
              <AvatarFallback>{project.owner.name[0]}</AvatarFallback>
            </Avatar>
            <span>
              {project.owner.name} {project.owner.surname}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['BACKLOG', 'IN_PROGRESS', 'DONE'] as const).map((status) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="text-base">
                {status === 'BACKLOG' && 'Бэклог'}
                {status === 'IN_PROGRESS' && 'В процессе'}
                {status === 'DONE' && 'Завершено'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {groupedTasks[status].length === 0 ? (
                <p className="text-sm text-muted-foreground">Нет задач</p>
              ) : (
                groupedTasks[status].map((task) => (
                  <div key={task.id} className="border p-3 rounded-md bg-muted/20 space-y-1">
                    <p className="font-medium">{task.title}</p>
                    <div className="flex flex-wrap gap-1 text-xs">
                      <Badge variant="outline">
                        Создана: {format(task.createdAt, 'dd.MM.yyyy')}
                      </Badge>
                      {task.startDate && (
                        <Badge variant="secondary">
                          Начата: {format(task.startDate, 'dd.MM.yyyy')}
                        </Badge>
                      )}
                      {task.completedAt && (
                        <Badge variant="default">
                          Завершена: {format(task.completedAt, 'dd.MM.yyyy')}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
