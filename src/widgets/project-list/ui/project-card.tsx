import { FC } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/shared/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { BookImage, CalendarDays, Link, MessageSquareText } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/shared/ui/button';

import { Progress } from './progress';
import { ProjectCardProps } from '../types/project-list.types';
import { EditProjectDialog } from '@/features/edit-project';
import { DeleteProjectButton } from '@/features/delete-project/ui/delete-project-dialog';
import { StatusBadge } from './status-badge';
import { CreateTaskDialog } from '@/features/create-task';

export const ProjectCard: FC<ProjectCardProps> = ({ project, currentUserId }) => {
  const isOwner = project.ownerId === currentUserId;
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            {project.icon}
          </div>
          <div className="flex -space-x-2">
            {project.participants.map(({ user }) => (
              <Avatar key={user.id}>
                <AvatarImage src={user.avatarUrl ?? ''} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <CardTitle className="text-xl flex items-center justify-between">
          {project.title}{' '}
          <StatusBadge status={project.status as 'BACKLOG' | 'IN_PROGRESS' | 'DONE'} />
        </CardTitle>

        <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          {format(new Date(project.dueDate), 'dd MMM yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={0} />
      </CardContent>
      <CardFooter className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <MessageSquareText className="text-muted-foreground" /> 3
          </Button>
          <Button size="icon" variant="ghost">
            <BookImage className="text-muted-foreground" /> 6
          </Button>
          <Button size="icon" variant="ghost">
            <Link className="text-muted-foreground" /> 3
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <CreateTaskDialog projectId={project.id} />
          <EditProjectDialog
            project={{ ...project, status: project.status as 'BACKLOG' | 'IN_PROGRESS' | 'DONE' }}
          />
          {isOwner && (
            <DeleteProjectButton
              projectId={project.id}
              ownerId={project.ownerId}
              currentUserId={currentUserId}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
