import { FC } from 'react';

import { ProjectCard } from './project-card';
import { ProjectListProps } from '../types/project-list.types';

export const ProjectList: FC<ProjectListProps> = ({ projects, currentUserId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} currentUserId={currentUserId} />
      ))}
    </div>
  );
};
