import { getProjectById } from '@/entities/project/server';
import { ProjectTasksWidgetServer, StatusBadge } from '@/widgets';
import { matchEither } from '@/shared/lib/either';
import { formatDate } from '@/shared/lib/date-utils';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { CreateTaskDialog } from '@/features/create-task';
import { getCurrentUser } from '@/entities/user/server';
import { EditProjectDialog } from '@/features/edit-project';
import { DeleteProjectButton } from '@/features/delete-project/ui/delete-project-dialog';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const result = await getProjectById(projectId);
  const user = await getCurrentUser();
  const isOwner = result.type === 'right' && result.value.owner.id === user?.id;

  return matchEither(result, {
    left: (error) => (
      <div className="flex flex-col items-center justify-center h-64 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Проект не найден</h1>
        <p className="text-sm">
          Код ошибки: <code>{error}</code>
        </p>
      </div>
    ),
    right: (project) => (
      <div className="container mx-auto py-8 px-4 space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex flex-wrap items-center gap-4 mb-4">
                <span>
                  {project.icon} {project.title}
                </span>
                <StatusBadge status={project.status as 'BACKLOG' | 'IN_PROGRESS' | 'DONE'} />
              </h1>
              <p className="text-sm text-muted-foreground">
                Срок: До {formatDate(project.dueDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Владелец:</span>
            <UserAvatar
              name={project.owner.name}
              surname={project.owner.surname}
              src={project.owner.avatarUrl}
            />
            <div className="text-sm">
              <div>
                {project.owner.name} {project.owner.surname}
              </div>
              <div className="text-muted-foreground">{project.owner.email}</div>
            </div>
          </div>
        </header>
        <div className="flex items-center gap-2 ml-auto mt-4">
          <CreateTaskDialog projectId={project.id} />
          <EditProjectDialog
            project={{ ...project, status: project.status as 'BACKLOG' | 'IN_PROGRESS' | 'DONE' }}
          />
          {isOwner && (
            <DeleteProjectButton
              projectId={project.id}
              ownerId={project.ownerId}
              currentUserId={user?.id || ''}
            />
          )}
        </div>
        {project.participants.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Участники проекта</h2>
            <ul className="flex flex-wrap gap-4">
              {project.participants.map((p) => (
                <li key={p.user.id} className="flex items-center gap-3">
                  <UserAvatar name={p.user.name} surname={p.user.surname} src={p.user.avatarUrl} />
                  <div className="text-sm">
                    <div>
                      {p.user.name} {p.user.surname}
                    </div>
                    <div className="text-muted-foreground">{p.user.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Задачи проекта</h2>
          <ProjectTasksWidgetServer projectId={projectId} />
        </section>
      </div>
    ),
  });
}
