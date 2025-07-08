'use client';
import { useState } from 'react';

import { Task } from './task';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useTaskStore, ITask } from '@/entities';

const TAB_VALUES = {
  ALL: 'all',
  PENDING: 'pending',
  PROGRESS: 'in progress',
  DONE: 'done',
} as const;

type SortOrder = 'asc' | 'desc';

const sortByProgress = (list: ITask[], order: SortOrder) =>
  [...list].sort((a, b) => (order === 'asc' ? a.progress - b.progress : b.progress - a.progress));

export function LastTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const getSortedTasks = (status?: string) => {
    const filtered = status ? tasks.filter((task) => task.status === status) : tasks;
    return sortByProgress(filtered, sortOrder);
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-lg font-semibold">
          Last tasks <span className="text-muted-foreground">({tasks.length})</span>
        </h2>
      </div>

      <Tabs defaultValue={TAB_VALUES.ALL}>
        <div className="flex items-center justify-end gap-4">
          <Select value={sortOrder} onValueChange={(val) => setSortOrder(val as SortOrder)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Progress: Low → High</SelectItem>
              <SelectItem value="desc">Progress: High → Low</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="">
            <TabsTrigger value={TAB_VALUES.ALL}>All</TabsTrigger>
            <TabsTrigger value={TAB_VALUES.PENDING}>Backlog</TabsTrigger>
            <TabsTrigger value={TAB_VALUES.PROGRESS}>In progress</TabsTrigger>
            <TabsTrigger value={TAB_VALUES.DONE}>Done</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={TAB_VALUES.ALL}>
          <ul className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
            {getSortedTasks().map((task) => (
              <li key={task.id}>
                <Task {...task} />
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value={TAB_VALUES.PENDING}>
          <ul className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
            {getSortedTasks('pending').map((task) => (
              <li key={task.id}>
                <Task {...task} />
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value={TAB_VALUES.PROGRESS}>
          <ul className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
            {getSortedTasks('in progress').map((task) => (
              <li key={task.id}>
                <Task {...task} />
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value={TAB_VALUES.DONE}>
          <ul className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
            {getSortedTasks('done').map((task) => (
              <li key={task.id}>
                <Task {...task} />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </section>
  );
}
