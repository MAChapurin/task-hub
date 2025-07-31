import { FC } from 'react';

import { ProjectCard } from './project-card';
import { ProjectListProps } from '../types/project-list.types';
import { NoProjectsCard } from './not-found-projects-card';
import { CreateProjectDialog } from '@/features/create-project';
import { Percent } from '@/shared/types';

export const ProjectList: FC<ProjectListProps> = ({ projects, currentUserId, tasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <CreateProjectDialog />
      {projects.length === 0 && (
        <div className="col-span-1 xl:col-span-2">
          <NoProjectsCard />
        </div>
      )}
      {projects.map((project) => {
        const finishedTasks = tasks.filter((task) => task.status === 'DONE');
        const percent = Math.round((finishedTasks.length / tasks.length) * 100);
        return (
          <ProjectCard
            key={project.id}
            project={project}
            currentUserId={currentUserId}
            progress={percent as Percent}
          />
        );
      })}
    </div>
  );
};
