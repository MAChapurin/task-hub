'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/shared/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { BookImage, CalendarDays, Link as LinkIcon, MessageSquareText } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/shared/ui/button';

import { ProjectCardProps } from '../types/project-list.types';
import { EditProjectDialog } from '@/features/edit-project';
import { DeleteProjectButton } from '@/features/delete-project/ui/delete-project-dialog';
import { StatusBadge } from './status-badge';
import { CreateTaskDialog } from '@/features/create-task';
import { Progress } from './progress';
import { PATHNAMES } from '@/shared/constants/pathnames';

export const ProjectCard: FC<ProjectCardProps> = ({ project, currentUserId, progress }) => {
  const router = useRouter();
  const isOwner = project.ownerId === currentUserId;

  const handleCardClick = () => {
    router.push(PATHNAMES.DASHBOARD + `/${project.id}`);
  };

  return (
    <Card className="transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:bg-muted/50 border border-transparent hover:border-primary cursor-pointer">
      <div onClick={handleCardClick}>
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
          <Progress value={progress} />
        </CardContent>
      </div>
      <CardFooter>
        <div className="w-full flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <MessageSquareText className="text-muted-foreground" /> 3
            </Button>
            <Button size="icon" variant="ghost">
              <BookImage className="text-muted-foreground" /> 6
            </Button>
            <Button size="icon" variant="ghost">
              <LinkIcon className="text-muted-foreground" /> 3
            </Button>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <CreateTaskDialog projectId={project.id} />
            <EditProjectDialog
              project={{
                ...project,
                status: project.status as 'BACKLOG' | 'IN_PROGRESS' | 'DONE',
              }}
            />
            {isOwner && (
              <DeleteProjectButton
                projectId={project.id}
                ownerId={project.ownerId}
                currentUserId={currentUserId}
              />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
