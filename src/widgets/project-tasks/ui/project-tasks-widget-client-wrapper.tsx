'use client';

import dynamic from 'next/dynamic';
import { Task } from '../types';

const ProjectTasksWidgetClient = dynamic(
  () => import('./project-tasks-widget-client').then((mod) => mod.ProjectTasksWidgetClient),
  { ssr: false }
);

export function ProjectTasksWidgetClientWrapper(props: { initialTasks: Task[] }) {
  return <ProjectTasksWidgetClient {...props} />;
}
