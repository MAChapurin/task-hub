'use client';

import { FC } from 'react';

import { ProjectWithParticipants } from '../domain';
import { ProjectCard } from './project-card';

type Props = {
  projects: ProjectWithParticipants[];
};

export const ProjectList: FC<Props> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
