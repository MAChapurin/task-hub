import { FC } from 'react';

import { ProjectCard } from './project-card';
import { ProjectListProps } from '../types/project-list.types';
import { NoProjectsCard } from './not-found-projects-card';
import { CreateProjectCard } from './create-project-card';

export const ProjectList: FC<ProjectListProps> = ({ projects, currentUserId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <CreateProjectCard />
      {projects.length === 0 && (
        <div className="col-span-1 xl:col-span-2">
          <NoProjectsCard />
        </div>
      )}
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} currentUserId={currentUserId} />
      ))}
    </div>
  );
};
