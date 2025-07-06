import { tasks } from '../mock';
import { Task } from './task';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const TAB_VALUES = {
  ALL: 'all',
  PENDING: 'pending',
  PROGRESS: 'in progress',
  DONE: 'done',
} as const;

const TAB_LABELS: Record<string, string> = {
  [TAB_VALUES.ALL]: 'All',
  [TAB_VALUES.PENDING]: 'Backlog',
  [TAB_VALUES.PROGRESS]: 'In progress',
  [TAB_VALUES.DONE]: 'Done',
};

export function LastTasks() {
  const filteredTasks = {
    [TAB_VALUES.ALL]: tasks,
    [TAB_VALUES.PENDING]: tasks.filter((task) => task.status === 'pending'),
    [TAB_VALUES.PROGRESS]: tasks.filter((task) => task.status === 'in progress'),
    [TAB_VALUES.DONE]: tasks.filter((task) => task.status === 'done'),
  };

  return (
    <section className="flex w-full flex-col">
      <h2 className="mb-4">
        Last tasks{' '}
        <span className="text-[var(--muted-foreground)]">({filteredTasks.all.length})</span>
      </h2>
      <Tabs defaultValue={TAB_VALUES.ALL}>
        <TabsList className="ml-auto">
          {Object.entries(TAB_LABELS).map(([key, label]) => (
            <TabsTrigger key={key} value={key}>
              {label}{' '}
              <span className="text-[var(--muted-foreground)]">
                ({filteredTasks[key as keyof typeof filteredTasks].length})
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(filteredTasks).map(([key, taskList]) => (
          <TabsContent key={key} value={key}>
            <ul className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
              {taskList.map((task) => (
                <li key={task.id}>
                  <Task {...task} />
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
