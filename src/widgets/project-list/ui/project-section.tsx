import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/shared/animate-ui/radix/tabs';
import { TAB_VALUES } from '../constants/tab-values';
import { ProjectListProps } from '../types/project-list.types';
import { FC } from 'react';
import { ProjectList } from './project-list';

export const ProjectSection: FC<ProjectListProps> = ({ projects, currentUserId, tasks }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Мои проекты ({projects.length})</h2>
      <Tabs defaultValue={TAB_VALUES.ALL} className="w-full rounded-lg">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value={TAB_VALUES.ALL}>Все</TabsTrigger>
          <TabsTrigger value={TAB_VALUES.BACKLOG}>Ожидание</TabsTrigger>
          <TabsTrigger value={TAB_VALUES.IN_PROGRESS}>В работе</TabsTrigger>
          <TabsTrigger value={TAB_VALUES.DONE}>Закончено</TabsTrigger>
        </TabsList>

        <TabsContents className="rounded-sm h-full bg-background">
          <TabsContent value={TAB_VALUES.ALL} className="space-y-2 md:space-y-6">
            <ProjectList projects={projects} currentUserId={currentUserId} tasks={tasks} />
          </TabsContent>
          <TabsContent value={TAB_VALUES.BACKLOG} className="space-y-2 p-2 md:space-y-6">
            <ProjectList
              projects={projects.filter((el) => el.status === 'BACKLOG')}
              currentUserId={currentUserId}
              tasks={tasks}
            />
          </TabsContent>
          <TabsContent value={TAB_VALUES.IN_PROGRESS} className="space-y-2 p-2 md:space-y-6">
            <ProjectList
              projects={projects.filter((el) => el.status === 'IN_PROGRESS')}
              currentUserId={currentUserId}
              tasks={tasks}
            />
          </TabsContent>
          <TabsContent value={TAB_VALUES.DONE} className="space-y-2 p-2 md:space-y-6">
            <ProjectList
              projects={projects.filter((el) => el.status === 'DONE')}
              currentUserId={currentUserId}
              tasks={tasks}
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </section>
  );
};
